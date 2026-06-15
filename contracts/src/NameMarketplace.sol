// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title NameMarketplace
/// @notice Escrow marketplace for Gigaverse Name NFTs on Abstract
contract NameMarketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 public nextListingId = 1;
    mapping(uint256 => Listing) public listings;

    uint256 public platformFeeBps = 250;
    address public feeRecipient;

    event Listed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price, uint256 fee);
    event Cancelled(uint256 indexed listingId);

    constructor(address _feeRecipient) Ownable(msg.sender) {
        feeRecipient = _feeRecipient;
    }

    function list(address nftContract, uint256 tokenId, uint256 price) external returns (uint256 listingId) {
        require(price > 0, "Price must be > 0");

        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not token owner");
        nft.transferFrom(msg.sender, address(this), tokenId);

        listingId = nextListingId++;
        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit Listed(listingId, msg.sender, nftContract, tokenId, price);
    }

    function buy(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing inactive");
        require(msg.value == listing.price, "Incorrect payment");

        listing.active = false;

        uint256 fee = (listing.price * platformFeeBps) / 10_000;
        uint256 sellerProceeds = listing.price - fee;

        (bool feeOk,) = feeRecipient.call{value: fee}("");
        require(feeOk, "Fee transfer failed");

        (bool sellerOk,) = listing.seller.call{value: sellerProceeds}("");
        require(sellerOk, "Seller transfer failed");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit Sold(listingId, msg.sender, listing.price, fee);
    }

    function cancel(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing inactive");
        require(msg.sender == listing.seller, "Not seller");

        listing.active = false;
        IERC721(listing.nftContract).transferFrom(address(this), listing.seller, listing.tokenId);

        emit Cancelled(listingId);
    }

    function setPlatformFeeBps(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 1000, "Fee too high");
        platformFeeBps = _feeBps;
    }

    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid recipient");
        feeRecipient = _feeRecipient;
    }
}
