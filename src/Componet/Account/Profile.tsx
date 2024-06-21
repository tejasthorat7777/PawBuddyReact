import { useEffect, useState } from "react";
import { UserData } from "../../commonFiles/commonTypes";
import { NotFound } from "../../Lottie/lottieComponent/NotFound";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const styles = {
  padding: "5%",
  border: "1px solid black",
  marginTop: "2%",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  color: "white",
  backgroundColor: "#00111c",
};

const outerDiv = {
  display: "flex",
  fontSize: "25px",
  justifyContent: "space-evenly",
  marginBottom: "1%",
};

const Profile = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isloading, setIsloading] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);

  const fetchData = async () => {
    try {
      setIsloading(true);
      //now we are fetching all doc as we do not have anything to find data.
      //TODO help of redux for username we will fetch userInformaion.
      // 1st Approach - sending userId with URL
      // 2nd Approach - check in for loop for userId
      const users = (await axios.get("http://localhost:3000/getUsersInfo")).data;
      // for (const user of users) {
      //   if (user.name === "zsdfgh") {
      //     setUserData(user as UserData);
      //   }
      // }
      setUserData(users.data[0] as UserData);
      setIsloading(false);
      setFetchComplete(true);
    } catch (error) {
      setIsloading(true);
      setFetchingError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isloading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
          }}
        >
          <CircularProgress />
        </div>
      ) : fetchingError ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NotFound />
        </div>
      ) : fetchComplete ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            padding: "3%",
            backgroundColor: "#597081",
          }}
        >
          *You cannot edit this fields
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Name
              <div style={styles}>{userData?.name}</div>
            </div>
            <div style={{ width: "20%" }}>
              Age
              <div style={styles}>{userData?.age}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Breed
              <div style={styles}>{userData?.breed}</div>
            </div>
            <div style={{ width: "20%" }}>
              Birthdate
              <div style={styles}>{userData?.birthdate}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Identification
              <div style={styles}>{userData?.identification}</div>
            </div>
            <div style={{ width: "20%" }}>
              Owner Name
              <div style={styles}>{userData?.owner}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Username
              <div style={styles}>{userData?.username}</div>
            </div>
            <div style={{ width: "20%" }}>
              Password
              <div style={styles}>{userData?.password}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Gender
              <div style={styles}>{userData?.gender}</div>
            </div>
            <div style={{ width: "20%" }}>
              City
              <div style={styles}>{userData?.city}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Profile;
