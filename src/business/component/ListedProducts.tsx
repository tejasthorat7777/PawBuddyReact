import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CustomTableColumn,
  CustomTableRow,
  flexDiv,
  h100w100,
  homeStyle,
} from "../../commonFiles/commonTheme";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductData } from "../../commonFiles/commonTypes";
import { EmptyList } from "../../Lottie/lottieComponent/EmptyList";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiUrl } from "../../commonFiles/commonFunctions";

function ListedProducts() {
  const headers = [
    "",
    "Product",
    "Name",
    "Brand",
    "Price",
    "Discount(%)",
    "Quantity",
  ];
  const user = useSelector((state: RootState) => state.user);
  const customerId = user.userId;
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async (customerId: string) => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const getData = await axios.get(
        `${apiUrl}/api/busi/getProducts/${customerId}`
      );
      const products = getData.data[0].products;
      setProducts(products);
    } catch (error) {
      console.log("error>>>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (customerId: string, prodId: string) => {
    try {
      await axios.post(`${apiUrl}/api/busi/delete`, {
        customerId,
        prodId,
      });
      const updateProductList = products.filter(
        (item) => item.prodId !== prodId
      );
      setProducts(updateProductList);
    } catch (error) {
      console.log("error>>>>>>", error);
    }
  };

  useEffect(() => {
    if (customerId) {
      getProduct(customerId);
    }
  }, []);

  return (
    <div style={{ ...homeStyle.outerDiv, overflow: "hidden" }}>
      {isLoading ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <CircularProgress
            sx={{
              color: "#ffb703",
            }}
          />
        </div>
      ) : products.length > 0 ? (
        <Paper>
          <div style={{ maxHeight: "85vh", overflowY: "auto" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {headers.map((label, index) => (
                    <CustomTableColumn
                      key={`row_${index}`}
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      {label}
                    </CustomTableColumn>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((prod, index) => (
                  <CustomTableRow
                    key={`row-${index}`}
                    style={{ cursor: "pointer" }}
                  >
                    <CustomTableColumn>
                      <IconButton
                        onClick={() => {
                          handleDelete(customerId, prod.prodId);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CustomTableColumn>
                    <CustomTableColumn
                      sx={{
                        padding: "0",
                      }}
                    >
                      <img
                        src={prod.prodImg}
                        style={{
                          height: "35px",
                        }}
                      />
                    </CustomTableColumn>
                    <CustomTableColumn>{prod.prodName}</CustomTableColumn>
                    <CustomTableColumn>{prod.prodBrand}</CustomTableColumn>
                    <CustomTableColumn>{prod.prodPrice}</CustomTableColumn>
                    <CustomTableColumn>{prod.prodDiscount}</CustomTableColumn>
                    <CustomTableColumn>{prod.pordQuant}</CustomTableColumn>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      ) : products.length === 0 ? (
        <div style={{ ...h100w100, ...flexDiv }}>
          <EmptyList />
          <span>Welcome You don't have any products listed yet...</span>
        </div>
      ) : null}
    </div>
  );
}
export default ListedProducts;
