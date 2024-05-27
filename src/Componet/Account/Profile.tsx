import { useEffect, useState } from "react";
import { CONNECT } from "../../dataBase/firebase";
import { UserData } from "../../commonFiles/commonTypes";
import { NotFound } from "../../Lottie/lottieComponent/NotFound";
import { Waiting } from "../../Lottie/lottieComponent/Waiting";
import { CircularProgress } from "@mui/material";

const styles = {
  padding: "5%",
  border: "1px solid black",
  marginTop: "2%",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  color: "gray",
};

const outerDiv = {
  display: "flex",
  fontSize: "25px",
  justifyContent: "space-evenly",
  marginBottom: "1%",
};

export const Profile = () => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isloading, setIsloading] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);

  const fetchData = async () => {
    try {
      setIsloading(true);
      const getData = await CONNECT.collection("UserData")
        .doc("priyanka7777")
        .get();
      if (getData.exists) {
        const response = getData.data();
        setUserData(response as UserData);
      }
      setIsloading(false);
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
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
      ) : (
        <div style={{ height: "100%", width: "100%", padding: "3%" }}>
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
      )}
    </>
  );
};
