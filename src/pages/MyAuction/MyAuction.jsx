import React, { useEffect, useState } from "react";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";

const MyAuction = () => {
  const [auctions, setAuctions] = useState([]);

  const getMyAuction = () => {
    const accessId = localStorage.getItem("USER_DATA");
    const data = JSON.parse(accessId);
    axios
      .get(
        `http://localhost:4000/${apiEndPoints.getMyAuction}/${data?.result?._id}`
      )
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  };

  useEffect(() => {
    getMyAuction();
  }, []);

  return (
    <div className="container m-auto">
      <section className="text-gray-600 body-font">
        <div className="container">
          <div className="flex flex-wrap">
            {auctions.map((auction, i) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={i}>
                <Link
                  to="/auction-detail"
                  className="block relative h-48 rounded overflow-hidden"
                  state={auction}
                >
                  <img
                    alt={auction.productName}
                    className="object-cover object-center w-full h-full block border border-gray-200"
                    src={`http://localhost:4000${auction.productImage}`}
                  />
                </Link>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {auction.productName}
                  </h2>
                  <div className="truncate">
                    <h3 className="text-gray-500  text-xs tracking-widest title-font mb-1 text-ellipsis">
                      {auction.details}
                    </h3>
                  </div>
                  <p>Starting Bid Price: ₹ {auction.startingBidPrice}</p>
                  {auction.bids.length === 0 ? (
                    <p>Current Highest Bid: _ _ _</p>
                  ) : (
                    <p>
                      Current Highest Bid: ₹{" "}
                      {auction.bids[auction.bids.length - 1]?.bidAmount}
                    </p>
                  )}
                  <p>
                    Auction Ends:{" "}
                    <Countdown date={new Date(auction.auctionEndTime)} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAuction;
