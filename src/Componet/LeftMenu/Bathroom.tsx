import axios from "axios";
import { apiUrl, loadCached } from "../../commonFiles/commonFunctions";
import ProductPage from "../../commonFiles/ProductPage";
type iAccessories = {
  bathroomType: string;
};
export const Bathroom: React.FC<iAccessories> = ({ bathroomType }) => {
  const getBathroomBasics = async () => {
    try {
      const cacheProducts = loadCached(bathroomType);
      if (cacheProducts) {
        return cacheProducts;
      }
      const getData = await axios.get(
        `${apiUrl}/api/getdogfood/${bathroomType}`
      );
      return getData.data;
    } catch (error) {
      throw new Error("Error During Fetching Products" + bathroomType + error);
    }
  };

  return <ProductPage callback={getBathroomBasics} cacheKey={bathroomType} />;
};
