import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { LoginRequired } from "../../Lottie/lottieComponent/LoginRequired";
import { flexDiv } from "../../commonFiles/commonTheme";

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
  const user = useSelector((state: RootState) => state.finalState.user);

  console.log("user>>>>", user);

  return (
    <>
      {user?.userId === "" ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            ...flexDiv,
          }}
        >Please Login
          <LoginRequired />
        </div>
      ) : (
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
              <div style={styles}>{user?.name}</div>
            </div>
            <div style={{ width: "20%" }}>
              Age
              <div style={styles}>{user?.age}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Breed
              <div style={styles}>{user?.breed}</div>
            </div>
            <div style={{ width: "20%" }}>
              Birthdate
              <div style={styles}>{user?.birthdate}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Identification
              <div style={styles}>{user?.identification}</div>
            </div>
            <div style={{ width: "20%" }}>
              Owner Name
              <div style={styles}>{user?.owner}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Username
              <div style={styles}>{user?.username}</div>
            </div>
            <div style={{ width: "20%" }}>
              Password
              <div style={styles}>{user?.password}</div>
            </div>
          </div>
          <div style={outerDiv}>
            <div style={{ width: "20%" }}>
              Gender
              <div style={styles}>{user?.gender}</div>
            </div>
            <div style={{ width: "20%" }}>
              City
              <div style={styles}>{user?.city}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
