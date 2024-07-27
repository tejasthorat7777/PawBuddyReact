import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";
import { cartStyle, flexDiv, homeStyle } from "../../commonFiles/commonTheme";
import coller from "../../assets/red-dog-collar.jpg";
import StarRating from "../../commonFiles/StartRatins";
import Quantity from "../../commonFiles/Quantity";

const orderButton = {
  borderRadius: "0",
  backgroundColor: "#ffbe0b",
  color: "white",
  width: "100%",
  height: "10%",
};

const Cart = () => {
  const des =
    "Foodie Puppies Adjustable Nylon Tactical Dog Collar - (Green, Xtra-Large) for Large & Giant Dogs | Metal D-Ring with Strap Handle | Durable & Adjustable Collar for Dog Military Training";

  return (
    <div
      style={{
        ...homeStyle.outerDiv,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Card data-testid={`product_`} style={cartStyle.cardStyle}>
        <CardActionArea style={cartStyle.cardActionArea}>
          <CardMedia sx={homeStyle.cardMedia}>
            <img src={coller} style={cartStyle.imageStyle} />
          </CardMedia>
        </CardActionArea>
        <Box style={cartStyle.boxStyle}>
          <Typography style={cartStyle.detailsText}>{des}</Typography>
          <Box style={{ ...flexDiv, justifyContent: "space-between" }}>
            <Typography style={cartStyle.priceText}>{`₹ 699.00`}</Typography>
            <StarRating rating={2} />
          </Box>
          <CardActions sx={{ padding: "0", marginTop: "2%" }}>
            <Button style={cartStyle.IconButton}>see more like this</Button>
            <Quantity
              style={{ width: "50%", marginLeft: "5%", scale: "0.9" }}
            />
          </CardActions>
        </Box>
        <Button style={orderButton}>Place your Order</Button>
      </Card>
    </div>
  );
};
export default Cart;
