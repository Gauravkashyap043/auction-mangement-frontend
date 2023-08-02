import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputField from "../../components/InputField/InputField";
import { toast } from "react-toastify";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { Api } from "../../classes/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [bidPriceError, setBidPriceError] = useState("");
  const [bidId, setBidId] = useState("");
  const [startingBidPrice, setStartingBidPrice] = useState("");
  const [currentHighestBid, setCurrentHighestBid] = useState("");

  const handleClose = () => {
    setOpen(false);
    setBidPrice("");
  };

  const getAuctionList = () => {
    axios
      .get("http://localhost:4000/auctions")
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  };
  useEffect(() => {
    // Fetch the auction list from the API
    getAuctionList();
  }, []);

  const placeBid = () => {
    let validbid = false;
    if (!bidPrice) {
      setBidPriceError("Field is required");
    } else if (bidPrice < startingBidPrice) {
      setBidPriceError("Bid price should be more than starting Bid price");
    } else {
      setBidPriceError("");
      validbid = true;
    }

    if (validbid) {
      setLoading(true);
      const apiParams = {
        url: `${apiEndPoints.placeBid}/${bidId}`,
        requestMethod: "post",
        response: (res) => {
          setLoading(false);
          toast.success(res.message);
          setOpen(false);
          setBidPrice("");
          getAuctionList();
        },
        errorFunction: (error) => {
          console.log("---error--", error);
          toast.warn(error.error);
          setLoading(false);
          
        },
        endFunction: () => {
          console.log("End Function Called");
        },
        input: {
          bidAmount: bidPrice,
        },
      };
      Api.callApi(apiParams, "application/json");
    }
  };
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
                  <div className="w-full flex justify-center items-center mt-5">
                    <button
                      className="w-full py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
                      onClick={() => (
                        setOpen(true),
                        setBidId(auction._id),
                        setCurrentHighestBid(
                          auction.bids[auction.bids.length - 1]?.bidAmount
                        ),
                        setStartingBidPrice(auction.startingBidPrice)
                      )}
                      disabled={new Date(auction.auctionEndTime) <= new Date()}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Starting Bid Price : {startingBidPrice}</p>
            <p>
              Current Highest Bid :{" "}
              {currentHighestBid ? currentHighestBid : "_ _ _"}
            </p>
            <InputField
              onChange={(e) =>
                setBidPrice(e.target.value) || setBidPriceError()
              }
              properties={{
                fieldType: "currBidPrice",
              }}
              style={!bidPriceError ? "style" : "errorStyle"}
              value={bidPrice}
            />
            {bidPriceError && (
              <p className="text-red-500 text-sm">{bidPriceError}</p>
            )}
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              onClick={placeBid}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Place"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
