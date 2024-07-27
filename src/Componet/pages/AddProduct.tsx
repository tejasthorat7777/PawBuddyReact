import React, { useState } from "react";
import '../Registration/registration.css';

import { Button } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/system';
import { ToastContainer, toast } from "react-toastify";
import styles from "../../commonFiles/commonCss/toast.module.css";

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [venderName, setVenderName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleVenderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVenderName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleProductDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
      const previewUrl = URL.createObjectURL(files[0]);
      console.log("previewUrl>>>>",previewUrl);
      
      setPreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log("inside submit>>>>>");
toast(`Sorry, Cannot remove Right Now...`);
  };

  return (
    <div className="main_container">
      <div className="add-product-container">
        <h1 className="add-product-title">Add Product</h1>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="left-side">
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="Preview" className="image-preview-img" />
              </div>
            ) : (
              <Button
                component="label"
                variant="outlined"
                startIcon={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
            )}
          </div>
          <div className="right-side">
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={productName}
              onChange={handleProductNameChange}
              className="input-field"
             style={{width:"80%"}}
            />
            <input
              type="text"
              name="venderName"
              placeholder="Enter Vender's Name"
              value={venderName}
              onChange={handleVenderNameChange}
              className="input-field"
              style={{width:"80%"}}
            />
            <input
              type="text"
              name="price"
              placeholder="Enter Price of Product"
              value={price}
              onChange={handlePriceChange}
              className="input-field"
              style={{width:"80%"}}
            />
            <textarea
              name="description"
              aria-multiline
              placeholder="Enter Product's Description"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              className="input-field"
              style={{width:"80%"}}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-button"
              onClick={()=>handleSubmit}
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
      {/* <div data-testid="toast">
        <ToastContainer
          position="bottom-left"
          toastClassName={styles.toast}
          bodyClassName={styles.body}
          hideProgressBar={true}
          autoClose={1000}
        />
      </div> */}
    </div>
  );
};

export default AddProduct;
