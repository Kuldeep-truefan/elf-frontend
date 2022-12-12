import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import Troovilogo from "./assets/Trooviloginlogo.svg";
import Devices from "./assets/Devices.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import LockIcon from "@mui/icons-material/Lock";
import OtpInput from "react-otp-input";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Cancel from "./Pages/components/svg/Cancel.svg";
import { SetOtp, SignInWithPhoneNoAndOtp } from "../../sm/src/Services/Authentication";
import { roleAuth } from "../../sm/src/App";

const LoginAuth = () => {
  const { setRole, setLoginDetails } = useContext(roleAuth);
  const [page, setPage] = useState(true);
  const [phoneNo, setPhoneNo] = useState("");
  const [OTP, setOTP] = useState("");
  const [showError, setError] = useState(false);
  function handleOnChange(value, data, event, formattedValue) {
    setPhoneNo(formattedValue.replace(/\s/g, "").replace("-", ""));
  }
  const handleSendOtp = () => {
    if (phoneNo) {
      SetOtp(phoneNo)
        .then((res) => {
          if (res.status == 200) {
            setPage(false);
          } else {
            setPage(true);
          }
        })
        .catch((err) => console.log("errr"));
    } else {
      console.log("erroor");
    }
  };
  const handleOtpNumberAuth = async () => {
    let otp = `TA${OTP}`;
    if (otp.length < 4) {
      setError(true);
    } else {
      try {
        const res = await SignInWithPhoneNoAndOtp(phoneNo, otp);
        setLoginDetails(res);
        window.localStorage.setItem("TrooviUserDetail", JSON.stringify(res));
        if (res.isExistingUser) {
          if (res.subrole === undefined) {
            alert("subrole is not defined")
            setRole("Notfound");
          } else {
            setRole(res.subrole);
          }
        } else {
          alert("incorrect phone number or OTP");
          setRole("Notfound");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  let ResendOtp = async () => {
    try {
      let res = await SetOtp(phoneNo);
      if (res.status == "200") {
        console.log("succesfull");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginBtn = {
    width: "100%",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    padding: "12px 0px",
    mt: 3,
    backgroundColor: "#312968",
    "&:hover": {
      backgroundColor: "#312968",
    },
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          overflowY: "hidden",
        }}
        className="origin_des"
      >
        <Box className="login_box_wrapper">
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <img src={Cancel} alt="cancel"></img>
          </Box>
          <Box className="login_main_wrapper">
            <Box className="login_banner_wrapper">
              <Box className="login_banner">
                <img src={Troovilogo} alt="troovi" width="150px"></img>
                <Box sx={{ width: "100%" }} className="banner_text_wrapper">
                  <Typography className="banner_text">
                    India’s best app for Logistics
                  </Typography>
                  <Typography className="banner_text">
                    Start your journey with us
                  </Typography>
                </Box>
                <img src={Devices} alt="devices" width="300px"></img>
              </Box>
            </Box>
            {page ? (
              <Box className="verification_main">
                <Box className="verification__text_wrapper">
                  <Typography className="welcome_text">Welcome!</Typography>
                  <Typography className="welcome_text">
                    Get started with Troovi
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 400, fontFamily: "Poppins" }}>
                    Mobile number verification
                  </Typography>
                  <PhoneInput
                    onlyCountries={["in"]}
                    country="in"
                    onChange={(value, data, event, formattedValue) =>
                      handleOnChange(value, data, event, formattedValue)
                    }
                    inputStyle={{ width: "100%", borderRadius: 5 }}
                    specialLabel=""
                    countryCodeEditable={false}
                    disableDropdown={true}
                    disableSearchIcon={true}
                    buttonStyle={{
                      marginTop: 3,
                      marginBottom: 3,
                      width: "20%",
                    }}
                    containerStyle={{
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                      borderRadius: 5,
                      fontFamily: "Poppins",
                      "&.react-tel-input .form-control:focus": {
                        borderColor: "#69e781",
                        boxShadow: "0px 0px 0px 1px #69e781",
                      },
                    }}
                  />
                  <Button
                    onClick={handleSendOtp}
                    variant="contained"
                    sx={{
                      width: "100%",
                      textTransform: "capitalize",
                      fontFamily: "Poppins",
                      padding: "12px 0px",
                      mt: 2.6,
                      backgroundColor: "#312968",
                      "&:hover": {
                        backgroundColor: "#312968",
                      },
                    }}
                    disabled={phoneNo.length == 13 ? false : true}
                  >
                    Continue
                  </Button>
                  <Box
                    sx={{
                      mt: 1,
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                    }}
                    className="origin_des"
                  >
                    <LockIcon style={{ color: "#a0a0a0" }} />
                    <Typography className="posted_date" sx={{ pl: 1 }}>
                      Guaranteed Data Protection
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                className="verification_main"
                sx={{ pt: "1rem", pl: "2.5rem" }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => setPage(true)}
                >
                  <ArrowBackIosNewIcon />
                  <Typography sx={{ fontFamily: "Poppins", ml: 2 }}>
                    Back
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box className="flexcol" sx={{ width: "90%", mt: 2 }}>
                    <Typography className="welcome_text" sx={{ width: "100%" }}>
                      Phone Verification
                    </Typography>
                    <Box sx={{ mt: 1, mb: 4, width: "100%" }}>
                      <Typography
                        className="posted_date"
                        sx={{ textAlign: "center", py: "2px" }}
                      >
                        Verification code has been sent to
                      </Typography>
                      <Typography
                        className="posted_date"
                        sx={{ textAlign: "center", py: "2px" }}
                      >
                        {phoneNo}
                      </Typography>
                    </Box>
                    <Box>
                      <OtpInput
                        numInputs={4}
                        className="otp-box"
                        value={OTP}
                        onChange={setOTP}
                        hasErrored={showError}
                        errorStyle={{ border: "1px solid red" }}
                      />
                      {showError ? (
                        <Typography
                          className="fs_12"
                          sx={{ color: "#FD2020", mt: 2 }}
                        >
                          Please enter OTP
                        </Typography>
                      ) : null}
                      <Typography
                        className="posted_date"
                        sx={{ textAlign: "left", mt: 1 }}
                      >
                        Didn’t receive code?{" "}
                        <Typography
                          variant="span"
                          onClick={ResendOtp}
                          sx={{ color: "#312968" }}
                        >
                          Resend
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  onClick={handleOtpNumberAuth}
                  variant="contained"
                  disabled={OTP.length == 4 ? false : true}
                  sx={loginBtn}
                >
                  Verify
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginAuth;
