import axios from "axios";
import { apiUrl, loadCached } from "../../commonFiles/commonFunctions";
import ProductPage from "../../commonFiles/ProductPage";
type iAccessories = {
  accessoryType: string;
};
export const Accessories: React.FC<iAccessories> = ({ accessoryType }) => {
  const getAccessories = async () => {
    try {
      const cacheProducts = loadCached(accessoryType);
      if (cacheProducts) {
        return cacheProducts;
      }
      const getData = await axios.get(`${apiUrl}/api/getdogfood/${accessoryType}`);
      return getData.data;
    } catch (error) {
      throw new Error("Error During Fetching Products" + accessoryType + error);
    }
  };

  return <ProductPage callback={getAccessories} cacheKey={accessoryType} />;
};
