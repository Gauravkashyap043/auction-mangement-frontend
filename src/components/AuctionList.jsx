import React, { useState, useEffect } from "react";
import axios from "axios";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch the auction list from the API
    axios
      .get("http://localhost:4000/auctions")
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  }, []);

  return (
    <div>
      {auctions.map((auction) => (
        <div key={auction._id}>
          <h3>{auction.productName}</h3>
          <p>{auction.details}</p>
          <p>Starting Bid Price: {auction.startingBidPrice}</p>
          <p>Auction Duration: {auction.auctionDuration}</p>
          {/* Display the image using the productImage URL */}
          <img
            src={`http://localhost:4000${auction.productImage}`}
            alt={auction.productName}
          />
        </div>
      ))}
    </div>
  );
};

export default AuctionList;
