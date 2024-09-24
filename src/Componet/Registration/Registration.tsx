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
import { Link } from "react-router-dom";
import { SendButton } from "../../commonFiles/SendButton";
import {
  apiUrl,
  generateRandomUserId,
} from "../../commonFiles/commonFunctions";

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

const initialUserData: UserData = {
  acc_type: "",
  gender: "",
  name: "",
  age: "",
  breed: "",
  birthdate: "",
  owner: "",
  identification: "",
  username: "",
  password: "",
  userId: generateRandomUserId().toString(),
};

export default function Registration() {
  // TODD we need to introduce a registration form for business also
  // currently we are giving select option for acc type but it will be change in future
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const [isLoading, setIsloading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [formSend, setFormSend] = useState(false);

  const accountType = ["Select", "Business", "Customer"];

  useEffect(() => {}, [userData]);

  const sendData = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsloading(true);
    try {
      event.preventDefault();
      await axios.post(`${apiUrl}/api/sendUsersInfo`, userData);
      setFormSend(true);
    } catch (error) {
      console.log("Error>>>>", error);
      setUploadError(true);
    }
    finally{
      setIsloading(false);
    }
  };

  return (
    <div key={`outerDiv`}>
      {isLoading ? (
        <div style={commonStyleDiv} data-testid="waiting">
          <Waiting />
          Relax... Saving Your Data
        </div>
      ) : uploadError ? (
        <div style={commonStyleDiv} data-testid="notfound">
          <NotFound />
        </div>
      ) : formSend ? (
        <div style={commonStyleDiv} data-testid="donetick">
          <DoneTick />
          <div>
            <div style={{ padding: "5%" }}>Registration Successful</div>
            <Link to={"/"}>
              <Button>Want to shop click here</Button>
            </Link>
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
                    data-testid="name"
                    value={userData.name}
                    placeholder="Puppy Name"
                    autoComplete="off"
                    onChange={(event) => {
                      setUserData({ ...userData, name: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    value={userData.age}
                    name="age"
                    data-testid="age"
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
                    data-testid="breed"
                    placeholder="Breed"
                    autoComplete="off"
                    value={userData.breed}
                    onChange={(event) => {
                      setUserData({ ...userData, breed: event.target.value });
                    }}
                  />
                  <input
                    type="date"
                    name="birthdate"
                    data-testid="birthdate"
                    value={userData.birthdate}
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
                    data-testid="owner"
                    placeholder="Owner"
                    autoComplete="off"
                    value={userData.owner}
                    onChange={(event) => {
                      setUserData({ ...userData, owner: event.target.value });
                    }}
                  />
                  <input
                    type="text"
                    name="identity"
                    data-testid="identity"
                    placeholder="Identification"
                    value={userData.identification}
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
                    data-testid="username"
                    value={userData.username}
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
                    data-testid="password"
                    value={userData.password}
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
                            data-testid="male"
                            onClick={() => {
                              setUserData({
                                ...userData,
                                gender: "male",
                              });
                            }}
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
                            data-testid="female"
                            onClick={() => {
                              setUserData({
                                ...userData,
                                gender: "female",
                              });
                            }}
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
                    data-testid="selectForm"
                    sx={{
                      maxWidth: "50%",
                    }}
                    size="small"
                    style={{ marginTop: "5%" }}
                  >
                    <InputLabel
                      data-testid="select-acc_type"
                      style={{ color: "white", fontFamily: "cursive" }}
                    >
                      Account Type
                    </InputLabel>
                    <StyledSelect
                      data-testid="acc_type"
                      id="acc_type"
                      value={userData.acc_type}
                      onChange={(event) => {
                        setUserData({
                          ...userData,
                          acc_type: event.target.value as string,
                        });
                      }}
                    >
                      {accountType.map((acc_type, index) => (
                        <CustomMenuItem
                          value={acc_type}
                          key={`acc_type${acc_type}_${index}`}
                          data-testid={`acc_type${acc_type}`}
                        >
                          {acc_type}
                        </CustomMenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </div>
              </div>
              <SendButton
                operationOnData={sendData}
                style={{ bottom: "2%", left: "40%" }}
                text="SUBMIT"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
