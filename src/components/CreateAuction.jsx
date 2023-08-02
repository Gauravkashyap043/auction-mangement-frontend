import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import InputField from "../components/InputField/InputField"; // Replace with the actual path to InputField component
import { Api } from "../classes/Api";
import { apiEndPoints } from "../constants/apiEndPoints";

const CreateAuction = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [startingBidPrice, setStartingBidPrice] = useState("");
  const [auctionDuration, setAuctionDuration] = useState("");
  const [productImage, setProductImage] = useState(null);

  const [productNameError, setProductNameError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [startingBidPriceError, setStartingBidPriceError] = useState("");
  const [auctionDurationError, setAuctionDurationError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
  };

  const handleSubmit = () => {
    let productNameValid = false;
    let detailsValid = false;
    let startingBidPriceValid = false;
    let auctionDurationValid = false;

    if (!productName) {
      setProductNameError("Product name is required");
    } else {
      setProductNameError("");
      productNameValid = true;
    }

    if (!details) {
      setDetailsError("Details are required");
    } else {
      setDetailsError("");
      detailsValid = true;
    }

    if (!startingBidPrice) {
      setStartingBidPriceError("Starting bid price is required");
    } else if (startingBidPrice < 0) {
      setStartingBidPriceError("Starting bid price must be a positive value");
    } else {
      setStartingBidPriceError("");
      startingBidPriceValid = true;
    }

    if (!auctionDuration) {
      setAuctionDurationError("Auction duration is required");
    } else if (auctionDuration < 1) {
      setAuctionDurationError("Auction duration must be at least 1 minute");
    } else {
      setAuctionDurationError("");
      auctionDurationValid = true;
    }

    if (
      productNameValid &&
      detailsValid &&
      startingBidPriceValid &&
      auctionDurationValid
    ) {
      setLoading(true);

      
      const apiParams = {
        url: `${apiEndPoints.createAuction}`,
        requestMethod: "post",
        response: (res) => {
          setLoading(false);
          toast.success("Auction created successfully");
          
        },
        errorFunction: (error) => {
          setLoading(false);
          toast.error(error.error);
          console.error("Error creating auction:", error);
        },
        endFunction: () => {
          console.log("End Function Called");
        },
        input: {
          productName,
          details,
          startingBidPrice,
          auctionDuration,
          productImage,
        },
      };
      console.log("productImage===============",productImage);
      Api.callApi(apiParams,"multipart/form-data");
    }
  };

  return (
    <div className="create-auction-container w-full">
      <div className="w-[350px] mt-5 px-4 py-7 border-2 m-auto flex flex-col justify-center rounded-lg">
        <InputField
          properties={{
            fieldType: "productName",
          }}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={"style"}
        />
        {productNameError && (
          <p className="text-red-500 text-sm">{productNameError}</p>
        )}

        <InputField
          properties={{
            fieldType: "productDetails",
          }}
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          style={"style"}
        />
        {detailsError && <p className="text-red-500 text-sm">{detailsError}</p>}

        <InputField
          properties={{
            fieldType: "bidPrice",
          }}
          value={startingBidPrice}
          onChange={(e) => setStartingBidPrice(e.target.value)}
          style={"style"}
        />
        {startingBidPriceError && (
          <p className="text-red-500 text-sm">{startingBidPriceError}</p>
        )}

        <InputField
          properties={{
            fieldType: "duration",
          }}
          onChange={(e) => setAuctionDuration(e.target.value)}
          value={auctionDuration}
          style={"style"}
        />
        {auctionDurationError && (
          <p className="text-red-500 text-sm">{auctionDurationError}</p>
        )}
        <div>
          <label htmlFor="productImage">Product Image</label>
          <input
            type="file"
            id="productImage"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button
            className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
