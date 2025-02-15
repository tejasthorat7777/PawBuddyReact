import axios from "axios";
import { apiUrl, loadCached } from "../../commonFiles/commonFunctions";
import ProductPage from "../ProductPage/ProductPage";
type iDogFood = {
  foodType: string;
};
export const DogFood: React.FC<iDogFood> = ({ foodType }) => {
  const getDogFood = async () => {
    try {
      const cacheProducts = loadCached(foodType);
      if (cacheProducts) {
        return cacheProducts;
      }
      const getData = await axios.get(`${apiUrl}/api/getdogfood/${foodType}`);
      return getData.data;
    } catch (error) {
      throw new Error("Error During Fetching Products" + foodType + error);
    }
  };

  return <ProductPage callback={getDogFood} cacheKey={foodType} />;
};
