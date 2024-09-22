import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { flexDiv } from "./commonTheme";
import { useState } from "react";
import { QuantProps } from "./commonTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./commonCss/toast.module.css";

export const Quantity: React.FC<QuantProps> = ({ style = {}, id }) => {
  const [quantity, setQuantity] = useState(1);

  const addProduct = () => {
    setQuantity(quantity + 1);
  };

  const subtractProduct = () => {
    setQuantity(quantity !== 1 ? quantity - 1 : 1);
    if (quantity === 1) {
      toast("You must have 1 Item", {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Box
        style={{
          height: "5%",
          color: "white",
          backgroundColor: "grey",
          ...flexDiv,
          ...style,
          borderRadius: "3%",
        }}
      >
        <IconButton onClick={subtractProduct} data-testid={`delete_${id}`}>
          <DeleteIcon sx={{ fontSize: 20, color: "white" }} />
        </IconButton>
        <input
          data-testid={`value_${id}`}
          value={quantity}
          type="text"
          onChange={(e) => setQuantity(Number(e.target.value) || 0)}
          style={{
            backgroundColor: "white",
            padding: "4%",
            color: "black",
            textAlign: "center",
          }}
        />

        <IconButton onClick={addProduct} data-testid={`add_${id}`}>
          <AddIcon sx={{ fontSize: 20, color: "white" }} />
        </IconButton>
      </Box>
      <div data-testid="toast">
        <ToastContainer
          position="bottom-left"
          toastClassName={styles.toast}
          bodyClassName={styles.body}
          hideProgressBar={true}
          autoClose={1000}
        />
      </div>
    </>
  );
};
