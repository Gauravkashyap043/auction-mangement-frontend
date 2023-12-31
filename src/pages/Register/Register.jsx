import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Api } from "../../classes/Api";
import { apiEndPoints } from "../../constants/apiEndPoints";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { Helper } from "../../classes/Helper";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const submitForm = () => {
    let fullNameValid = false;
    if (!fullName) {
      setFullNameError("! Full Name is required");
    } else if (fullName.length < 3) {
      setFullNameError("! Full Name should be at least 3 characters long");
    } else {
      setFullNameError("");
      fullNameValid = true;
    }

    let numberValid = false;
    if (!number) {
      setNumberError("! Number is required");
    } else if (number.length < 10) {
      setNumberError("! Invalid Number");
    } else {
      setNumberError("");
      numberValid = true;
    }

    let passwordValid = false;
    if (!password) {
      setPasswordError("! Password is required");
    } else if (password.length < 6) {
      setPasswordError("! Length should be 6");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    if (fullNameValid && numberValid && passwordValid) {
      setLoading(true);
      const apiParams = {
        url: `${apiEndPoints.register}`,
        requestMethod: "post",
        response: (res) => {
          setLoading(false);
          toast.success(res.message);
          navigate("/login");
        },
        errorFunction: (error) => {
          console.log("---error--", error);

          toast.warn(error.message);
        },
        endFunction: () => {
          console.log("End Function Called");
        },
        input: {
          fullName: fullName,
          mobileNumber: number,
          password: password,
        },
      };
      Api.callApi(apiParams, "application/json");
    }
  };

  return (
    <div className="register-container h-screen w-screen">
      <div className="w-full mt-10">
        <div className="login-form w-[300px] h-[300px] border-2 m-auto flex flex-col justify-center">
          <div>
            <InputField
              onChange={(e) => setFullName(e.target.value)}
              properties={{
                fieldType: "fullName", // Assuming the fullName field is of type "text"
              }}
              style={!fullNameError ? "style" : "errorStyle"} // Add appropriate CSS style here
              value={fullName}
            />
            {fullNameError && (
              <p className="text-red-500 text-sm">{fullNameError}</p>
            )}
          </div>
          <div>
            <InputField
              onChange={(e) => setNumber(e.target.value)}
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              properties={{
                fieldType: "number",
              }}
              maxLength={10}
              style={"style"}
              value={number}
            />
            {numberError && (
              <p className="text-red-500 text-sm">{numberError}</p>
            )}
          </div>
          <div>
            <InputField
              onChange={(e) => setPassword(e.target.value)}
              properties={{
                fieldType: "password",
              }}
              maxLength={10}
              style={"style"}
              value={password}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="w-[200px] py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black"
              onClick={submitForm}
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
    </div>
  );
};

export default Register;
