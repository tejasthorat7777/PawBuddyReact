import { ProductData } from "../../commonFiles/commonTypes";
import axios from "axios";
import ProductPage from "../../commonFiles/ProductPage";
import { loadCached } from "../../commonFiles/commonFunctions";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const getAllProducts = async () => {
    try {
      const cacheProducts = loadCached("cachedProducts");
      if (cacheProducts) {
        return cacheProducts;
      }
      let Products: ProductData[] = [];
      const getData = await axios.get(`${apiUrl}/api/getProducts`);
      const data = getData.data;
      data.map((doc: any) => {
        doc.products.map((product: ProductData) => {
          Products.push(product);
        });
      });
      return Products;
    } catch (error) {
      throw new Error("Error During Fetching Products" + error);
    }
  };

  return (
    <ProductPage handleFunction={getAllProducts} cacheKey={"cachedProducts"} />
  );
};
export default Home;
