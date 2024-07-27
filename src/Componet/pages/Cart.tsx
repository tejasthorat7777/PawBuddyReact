import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { flexDiv, homeStyle } from "../../commonFiles/commonTheme";
import coller from "../../assets/red-dog-collar.jpg";
import adultPedegree from "../../assets/adultPedegree.jpg";
import StarRating from "../../commonFiles/StartRatins";
import { width } from "@mui/system";

const Cart = () => {
  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Card
        data-testid={`product_`}
        style={{
          width: "25%",
          height: "80%",
          marginTop: "5%",
        }}
      >
        <CardActionArea
          style={{
            height: "40%",
          }}
        >
          <CardMedia sx={homeStyle.cardMedia}>
            <img src={coller} style={{ height: "100%", width: "auto" }} />
          </CardMedia>
        </CardActionArea>
        <Box
          sx={{
            backgroundColor: "#00111c",
            padding: "5%",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              color: "white",
            }}
          >
            {
              "Foodie Puppies Adjustable Nylon Tactical Dog Collar - (Green, Xtra-Large) for Large & Giant Dogs | Metal D-Ring with Strap Handle | Durable & Adjustable Collar for Dog Military Training"
            }
          </Typography>
          <Box style={{ ...flexDiv, justifyContent: "space-between" }}>
            <Typography
              style={{
                fontSize: "25px",
                color: "white",
                marginTop: "2%",
              }}
            >{`₹ 699.00`}</Typography>
            <StarRating rating={2} />
          </Box>
          <CardActions sx={{ padding: "0" }}></CardActions>
        </Box>
      </Card>
    </div>
  );
};
export default Cart;
