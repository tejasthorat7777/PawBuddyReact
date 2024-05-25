import {
  Button,
  CircularProgress,
  InputLabel,
  RadioGroup,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
  styled,
} from "@mui/material";
import registrationImage from "../../assets/form_page.png";
import "./registration.css";
import { useEffect, useState } from "react";
import { CONNECT } from "../../dataBase/firebase";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CustomMenuItem } from "../../commonFiles/common";


interface FormData {
  city: string;
  gender: string;
  name: string;
  age: string;
  breed: string;
  birthdate: string;
  owner: string;
  identification: string;
  username: string;
  password: string;
}

const BaseSelect = styled(Select)(() => ({
  backgroundColor: "#00111C",
  "& .MuiSelect-icon": {
    color: "white",
  },
}));

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
  <BaseSelect {...props} MenuProps={{ PaperProps: { className } }} />
))(() => ({
  backgroundColor: "#00111C",
}));

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
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

  const handleCity = (city: SelectChangeEvent<unknown>) => {
    setFormData({ ...formData, city: city.target.value });
  };

  useEffect(() => {}, [formData]);

  const sendData = async () => {
    try {
      setIsloading(true);
      await CONNECT.collection("UserData").doc(formData.username).set(formData);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setUploadError(true);
    }
  };
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : uploadError ? (
        <div>Something Went Wrong</div>
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
                  <label htmlFor="name" style={{ fontFamily: "cursive" }}>
                    Name
                  </label>
                  <label htmlFor="age" style={{ fontFamily: "cursive" }}>
                    Age
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Puppy Name"
                    onChange={(event) => {
                      setFormData({ ...formData, name: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder="Puppy Age"
                    onChange={(event) => {
                      setFormData({ ...formData, age: event.target.value });
                    }}
                  />
                  <label htmlFor="breed" style={{ fontFamily: "cursive" }}>
                    Breed
                  </label>
                  <label htmlFor="birthdate" style={{ fontFamily: "cursive" }}>
                    Birthdate
                  </label>
                  <input
                    type="text"
                    name="breed"
                    placeholder="Breed"
                    onChange={(event) => {
                      setFormData({ ...formData, breed: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="birthdate"
                    placeholder="dd/mm/yy"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        birthdate: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor="Owner" style={{ fontFamily: "cursive" }}>
                    Owner
                  </label>
                  <label htmlFor="identity" style={{ fontFamily: "cursive" }}>
                    Identification
                  </label>
                  <input
                    type="text"
                    name="Owner"
                    placeholder="Owner"
                    onChange={(event) => {
                      setFormData({ ...formData, owner: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="identity"
                    placeholder="Identification"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        identification: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor="username" style={{ fontFamily: "cursive" }}>
                    Username
                  </label>
                  <label htmlFor="password" style={{ fontFamily: "cursive" }}>
                    Password
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        username: event.target.value,
                      });
                    }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      setFormData({
                        ...formData,
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
                    sx={{ maxWidth: "50%" }}
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
                      value={formData.city}
                      label="Age"
                      onChange={(event) => {
                        handleCity(event);
                      }}
                    >
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
