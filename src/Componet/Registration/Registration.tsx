import {
  Button,
  InputLabel,
  RadioGroup,
  Select,
  SelectProps,
  Typography,
  styled,
} from "@mui/material";
import registrationImage from "../../assets/form_page.png";
import "./registration.css";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CustomMenuItem, commonStyleDiv } from "../../commonFiles/commonTheme";
import { Waiting } from "../../Lottie/lottieComponent/Waiting";
import { DoneTick } from "../../Lottie/lottieComponent/DoneTick";
import { NotFound } from "../../Lottie/lottieComponent/NotFound";
import { UserData } from "../../commonFiles/commonTypes";
import axios from "axios";

const BaseSelect = styled(Select)(() => ({
  backgroundColor: "#00111C",
  color: "white",
  fontFamily: "cursive",
  "& .MuiSelect-icon": {
    color: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))(() => ({
  backgroundColor: "#00111C",
}));

export default function Registration() {
  const [userData, setUserData] = useState<UserData>({
    city: "",
    gender: "",
    name: "",
    age: "",
    breed: "",
    birthdate: "",
    owner: "",
    identification: "",
    username: "",
    password: "",
  });

  const [onHover, setOnHover] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [formSend, setFormSend] = useState(false);

  useEffect(() => {}, [userData]);

  const sendData =  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      event.preventDefault();
      setIsloading(true);
      axios.post("http://localhost:3000/sendUsersInfo", userData);
      console.log("UserData", userData);
      setTimeout(() => {
        setIsloading(false);
      }, 3000);
      setFormSend(true);
    } catch (error) {
      console.log("error>>>>>", error);
      setIsloading(false);
      setUploadError(true);
    }
  };
  return (
    <>
      {isLoading ? (
        <div style={commonStyleDiv}>
          <Waiting />
          Relax... Saving Your Data
        </div>
      ) : uploadError ? (
        <div style={commonStyleDiv}>
          <NotFound />
        </div>
      ) : formSend ? (
        <div style={commonStyleDiv}>
          <DoneTick />
          <div>
            <div style={{ padding: "5%" }}> Registration Successful</div>
            {/* //TODO Button functionality */}
            <Button>Want to shop click here</Button>
          </div>
        </div>
      ) : (
        <div className="sign-up">
          <div className="out-box">
            <div className="pic">
              <img src={registrationImage} alt="" />
            </div>
            <div className="in-box">
              <div className="details">
                <h1>
                  Yay, we love dogs! and Owner too please give us your{" "}
                  <i>Pups</i> basics
                </h1>
              </div>
              <div className="grid">
                <div className="grid1">
                  <label style={{ fontFamily: "cursive" }}>Name</label>
                  <label style={{ fontFamily: "cursive" }}>Age</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Puppy Name"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({ ...userData, name: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder="Puppy Age"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({ ...userData, age: event.target.value });
                    }}
                  />
                  <label style={{ fontFamily: "cursive" }}>Breed</label>
                  <label style={{ fontFamily: "cursive" }}>Birthdate</label>
                  <input
                    type="text"
                    name="breed"
                    placeholder="Breed"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({ ...userData, breed: event.target.value });
                    }}
                  />
                  <input
                    type="date"
                    name="birthdate"
                    placeholder="dd/mm/yy"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        birthdate: event.target.value,
                      });
                    }}
                  />
                  <label style={{ fontFamily: "cursive" }}>Owner</label>
                  <label style={{ fontFamily: "cursive" }}>
                    Identification
                  </label>
                  <input
                    type="text"
                    name="Owner"
                    placeholder="Owner"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({ ...userData, owner: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="identity"
                    placeholder="Identification"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        identification: event.target.value,
                      });
                    }}
                  />
                  <label style={{ fontFamily: "cursive" }}>Username</label>
                  <label style={{ fontFamily: "cursive" }}>Password</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username/Email"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        username: event.target.value,
                      });
                    }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        password: event.target.value,
                      });
                    }}
                  />
                  <FormControl style={{ marginTop: "5%" }}>
                    <FormLabel
                      id="gender"
                      sx={{
                        color: "white",
                        fontFamily: "cursive",
                        "&.Mui-focused": {
                          color: "white",
                        },
                      }}
                    >
                      Gender :
                    </FormLabel>
                    <RadioGroup row name="row-radio-buttons-group">
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            style={{
                              fontSize: "95%",
                              fontFamily: "cursive",
                            }}
                          >
                            Male
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 18,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            style={{
                              fontSize: "95%",
                              fontFamily: "cursive",
                            }}
                          >
                            Female
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    sx={{
                      maxWidth: "50%",
                    }}
                    size="small"
                    style={{ marginTop: "5%" }}
                  >
                    <InputLabel
                      id="select-city"
                      style={{ color: "white", fontFamily: "cursive" }}
                    >
                      City
                    </InputLabel>
                    <StyledSelect
                      id="city"
                      value={userData.city}
                      onChange={(event) => {
                        setUserData({
                          ...userData,
                          city: event.target.value as string,
                        });
                      }}
                    >
                      <CustomMenuItem value="select">Select</CustomMenuItem>
                      <CustomMenuItem value="Pune">Pune</CustomMenuItem>
                      <CustomMenuItem value="Nashik">Nashik</CustomMenuItem>
                      <CustomMenuItem value="Nagpur">Nagpur</CustomMenuItem>
                      <CustomMenuItem value="Mumbai">Mumbai</CustomMenuItem>
                      <CustomMenuItem value="Banglore">Banglore</CustomMenuItem>
                    </StyledSelect>
                  </FormControl>
                </div>
              </div>
              <Button
                type="submit"
                className="submitButton"
                variant="contained"
                style={{
                  position: "absolute",
                  bottom: "2%",
                  left: "40%",
                  backgroundColor: onHover ? "#597081" : "#00111c",
                  fontFamily: "cursive",
                }}
                onClick={sendData}
                onMouseEnter={() => {
                  setOnHover(true);
                }}
                onMouseLeave={() => {
                  setOnHover(false);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
