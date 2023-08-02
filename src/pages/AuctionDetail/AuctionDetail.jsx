import React, { useEffect, useState } from "react";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { environment } from "../../constants/environment";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Countdown from "react-countdown";
const AuctionDetail = () => {
  const location = useLocation();
  const [auction, setAuction] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/auctions/${location.state._id}`)
      .then((response) => {
        setAuction(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  }, []);

  console.log(auction);
  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-64 flex justify-center items-center">
          <p className="text-center text-lg font-bold">Loading.....</p>
        </div>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={auction?.productName}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded border border-gray-200"
                src={`http://localhost:4000${auction?.productImage}`}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  PRODUCT NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {auction?.productName}
                </h1>
                <div className="flex mb-4"></div>
                <p className="leading-relaxed">{auction?.details}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex ml-6 items-center"></div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹ {auction?.startingBidPrice}
                  </span>
                  <button className="flex ml-auto text-white bg-black border py-2 px-6 focus:outline-none hover:bg-white hover:text-black rounded">
                    Place Bid
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg">
                    Auction Ends:{" "}
                    <Countdown date={new Date(auction.auctionEndTime)} />
                  </p>
                  {/* {auction.bids?.length === 0 ? (
                  <p>Current Highest Bid: _ _ _</p>
                ) : (
                  <p>
                    Current Highest Bid: ₹{" "}
                    {auction.bids[auction.bids.length - 1]?.bidAmount}
                  </p>
                )} */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <table className="table-cont w-full">
              <thead>
                <tr>
                  <th>
                    <span>Sr. No.</span>
                  </th>
                  <th>
                    <span>Bidder Name</span>
                  </th>
                  <th>
                    <span>Mobile No.</span>
                  </th>
                  <th>
                    <span>Bidding Date</span>
                  </th>
                  <th>
                    <span>Bid Time</span>
                  </th>
                  <th>
                    <span>Bid Amount</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(auction.bids) &&
                  auction.bids.map((bid, index) => (
                    <tr key={bid._id}>
                      <td>{index + 1}</td>
                      <td>{bid.bidder.fullName}</td>
                      <td>{bid.bidder.mobileNumber}</td>
                      <td>
                        {new Date(bid.bidTime).toLocaleDateString("en-US")}
                      </td>
                      <td>
                        {new Date(bid.bidTime).toLocaleTimeString("en-US")}
                      </td>
                      <td>₹ {bid.bidAmount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default AuctionDetail;
