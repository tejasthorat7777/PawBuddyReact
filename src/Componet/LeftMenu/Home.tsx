import { ProductData } from "../../commonFiles/commonTypes";
import axios from "axios";
import ProductPage from "../ProductPage/ProductPage";
import { loadCached } from "../../commonFiles/commonFunctions";
import { apiUrl } from "../../commonFiles/commonFunctions";

const Home = () => {

  const getAllProducts = async () => {
    try {
      const cacheProducts = loadCached("cachedProducts");
      if (cacheProducts) {
        return cacheProducts;
      }
      let Products: ProductData[] = [];
      const getData = await axios.get(`${apiUrl}/getProducts`);
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

  return <ProductPage callback={getAllProducts} cacheKey={"cachedProducts"} />;
};
export default Home;
