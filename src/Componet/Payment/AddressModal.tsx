import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { SendButton } from "../../commonFiles/SendButton";

interface iAddressModal {
  open: boolean;
  onClose: () => void;
  onSubmit: (arg: string) => void;
}
const AddressModal = ({ open, onClose, onSubmit }: iAddressModal) => {
  const [address, setAddress] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          height:240
        }}
      >
        <h2>Enter Your Address</h2>
        <TextField
          label="please write your complete Address"
          fullWidth
          multiline
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mt: 2 }}
        />
        <SendButton
          operationOnData={() => onSubmit(address)}
          style={{ bottom: "5%", left: "38%" }}
          text="SUBMIT"
        />
      </Box>
    </Modal>
  );
};

export default AddressModal;
