import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import {
  CartListData,
  iProductPage,
  ProductData,
  WishListData,
} from "../../commonFiles/commonTypes";
import axios from "axios";
import {
  clearData,
  isItemExists,
  pawBuddyLogError,
} from "../../commonFiles/commonFunctions";
import { toast, ToastContainer } from "react-toastify";
import { flexDiv, h100w100, homeStyle } from "../../commonFiles/commonTheme";
import { CircularProgress, Container, Pagination } from "@mui/material";
import { BadRequest } from "../../Lottie/lottieComponent/BadRequest";
import RenderProducts from "./RenderProducts";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../commonFiles/commonCss/toast.module.css";
import { EmptyCart } from "../../Lottie/lottieComponent/EmptyCart";

/**
 * following code is temporarily need to change it with good LOTTIE
 */
const EmptyCartComponent = () => {
  return (
    <div style={{ ...h100w100, ...flexDiv, marginTop: "10%" }}>
      No Product Found
      <EmptyCart />
    </div>
  );
};

const ProductPage: React.FC<iProductPage> = ({ callback, cacheKey }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishListData[]>([]);
  const [cartList, setCartList] = useState<CartListData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productFetchError, setProductFetchError] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const moduleName = "ProductPage";

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await callback();
      if (data.length) {
        setProducts(data);
      } else {
        setEmptyList(true);
      }
    } catch (error) {
      setProductFetchError(true);
      pawBuddyLogError(moduleName, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const getWishList = async (customerId: string) => {
    try {
      const getData = await axios.get(
        `${apiUrl}/api/wishlist/get/${customerId}`
      );
      if (getData.data.items.length > 0) {
        setWishlistItems(getData.data.items);
      }
    } catch (error) {
      pawBuddyLogError(moduleName, error);
    }
  };

  const getCartList = async (customerId: string) => {
    try {
      const getData = await axios.get(`${apiUrl}/api/cart/get/${customerId}`);
      if (getData.data.items.length > 0) {
        setCartList(getData.data.items);
      }
    } catch (error) {
      pawBuddyLogError(moduleName, error);
    }
  };

  const cleanUp = () => {
    setProducts([]);
    setWishlistItems([]);
    setCartList([]);
  };

  useEffect(() => {
    clearData(cacheKey);
    getProducts();
    if (customerId) {
      getWishList(customerId);
      getCartList(customerId);
    }
    return () => {
      cleanUp();
    };
  }, [customerId]);

  const addTocart = async (item: ProductData) => {
    if (!customerId) {
      toast("Please log in to add items to your Cart.", {
        autoClose: 1000,
      });
      return;
    }

    const exists = isItemExists(cartList, item.prodId);

    try {
      if (!exists) {
        const dumpedData = { ...item, customerId };
        setCartList((prevCartList) => [...prevCartList, item]);
        toast("Item added to Cart", { autoClose: 1000 });
        await axios.post(`${apiUrl}/api/cart/dumped`, dumpedData);
      } else {
        setCartList((prevCartList) =>
          prevCartList.filter((cartList) => cartList.prodId !== item.prodId)
        );
        toast("Item removed from Cart", { autoClose: 1000 });
        await axios.post(`${apiUrl}/api/cart/remove`, {
          customerId,
          prodId: item.prodId,
        });
      }
    } catch (error) {
      toast("Error updating Cart. Please try again later.", {
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };

  const addToWishlist = async (item: ProductData) => {
    if (!customerId) {
      toast("Please log in to add items to your wishlist.", {
        autoClose: 1000,
      });
      return;
    }

    const exists = isItemExists(wishlistItems, item.prodId);

    try {
      if (!exists) {
        const dumpedData = { ...item, customerId };
        await axios.post(`${apiUrl}/api/wishlist/dumped`, dumpedData);
        setWishlistItems((prevWishlistItems) => [...prevWishlistItems, item]);
        toast("Item added to Wishlist", { autoClose: 1000 });
      } else {
        await axios.post(`${apiUrl}/api/wishlist/remove`, {
          customerId,
          prodId: item.prodId,
        });
        setWishlistItems((prevWishlistItems) =>
          prevWishlistItems.filter(
            (wishlistItem) => wishlistItem.prodId !== item.prodId
          )
        );
        toast("Item removed from Wishlist", { autoClose: 1000 });
      }
    } catch (error) {
      toast("Error updating wishlist. Please try again later.", {
        autoClose: 1000,
      });
      pawBuddyLogError(moduleName, error);
    }
  };

  const handleShare = async (title: string, price: string) => {
    try {
      await navigator.share({
        title: title,
        text: `Check out this ${title} for just ₹ ${price}.00`,
        url: window.location.href,
      });
      console.log("Share successful");
    } catch (error) {
      toast("Sorry, Error in sharing", {
        autoClose: 1000,
      });
      pawBuddyLogError(moduleName, error);
    }
  };

  return (
    <div style={{ ...homeStyle.outerDiv }}>
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv, marginTop: "20%" }}>
          <CircularProgress
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : productFetchError ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <BadRequest />
          Sorry No Product Found
          <br />
          Please try again...
        </div>
      ) : products.length > 0 ? (
        <>
          <div style={{ padding: "2px", minHeight: "82vh" }}>
            <RenderProducts
              products={products}
              handleShare={handleShare}
              addToWishlist={addToWishlist}
              addTocart={addTocart}
              wishlistItems={wishlistItems}
              cartList={cartList}
            />
          </div>
          <Container style={flexDiv}>
            <Pagination
              shape="rounded"
              color="primary"
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
              }}
            />
          </Container>
        </>
      ) : null}
      {emptyList && <EmptyCartComponent />}
      <ToastContainer
        position="bottom-left"
        toastClassName={styles.toast}
        bodyClassName={styles.body}
        hideProgressBar={true}
        autoClose={1000}
      />
    </div>
  );
};
export default ProductPage;
