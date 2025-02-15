import axios from "axios";
import { apiUrl, loadCached } from "../../commonFiles/commonFunctions";
import ProductPage from "../ProductPage/ProductPage";
type iAccessories = {
    shampooType: string;
};
export const Shampoo: React.FC<iAccessories> = ({ shampooType }) => {
  const getShampoo = async () => {
    try {
      const cacheProducts = loadCached(shampooType);
      if (cacheProducts) {
        return cacheProducts;
      }
      const getData = await axios.get(`${apiUrl}/api/getdogfood/${shampooType}`);
      return getData.data;
    } catch (error) {
      throw new Error("Error During Fetching Products" + shampooType + error);
    }
  };

  return <ProductPage callback={getShampoo} cacheKey={shampooType} />;
};
