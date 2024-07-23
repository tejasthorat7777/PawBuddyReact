import Backdrop from "@mui/material/Backdrop";
import backdropLogo from "../assets/backdropLogo.png"
import { CircularProgress } from "@mui/material";

const MuiBackdrop = ({
  isLoading = false,
  loaderText = "Please wait...",
  iconStyle = {},
}) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(2px)",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
      }}
      open={isLoading}
    >
      <div id="loadContainer">
        <CircularProgress size={65} style={{ color: "#ff751f" }} />
        <img alt="logo" src={backdropLogo} style={iconStyle || {}} id="L=loaderLogo" />
      </div>
      <span id="loader-text">
        {loaderText}
      </span>
    </Backdrop>
  );
};

export default MuiBackdrop;
