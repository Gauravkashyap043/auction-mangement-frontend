import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuctionDetails = () => {
  const { auctionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  const fetchAuctionDetails = async () => {
    try {
      const response = await axios.get(`/api/auctions/${auctionId}`);

      if (response.status === 200) {
        // Add the image URL to the auction object
        const auctionWithImageURL = {
          ...response.data,
          productImageURL: `/api/auctions/${response.data.productImage}`,
        };
        setAuction(auctionWithImageURL);
      } else {
        console.error("Failed to fetch auction details");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching auction details:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        auction && (
          <div>
            <h2>{auction.productName}</h2>
            <p>{auction.details}</p>
            <img src={auction.productImageURL} alt={auction.productName} />
            {/* Display other auction details */}
          </div>
        )
      )}
    </div>
  );
};

export default AuctionDetails;
