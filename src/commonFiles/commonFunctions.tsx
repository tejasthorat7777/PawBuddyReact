import { OrdersData } from "./commonTypes";
import LZString from "lz-string";
import moment from 'moment'

export const generateRandomUserId = () => {
  const min = Math.pow(10, 11);
  const max = Math.pow(10, 12) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const apiUrl = import.meta.env.VITE_API_URL;
export const currency = "₹";
export const formattedValue = (value: any) => {
  return value.toLowerCase().replace(/\s+/g, "");
};

export const generateProductId = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isItemExists = (list: any[], id: any) => {
  const itemExists = list.some((list) => list.prodId === id);
  return itemExists;
};

export const generateRandomOrderId = () => {
  const part1 = Math.floor(100 + Math.random() * 900);
  const part2 = Math.floor(1000000 + Math.random() * 9000000);
  const date = new Date();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const completeTime = `${hrs}${min}${sec}`;

  return `${part1}-${completeTime}-${part2}`;
};

export const getDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

export const loadCached = (id: string) => {
  const cached = localStorage.getItem(id);
  if (cached) {
    const decompressedCache = JSON.parse(LZString.decompress(cached));
    return decompressedCache;
  }
  return null;
};

export const clearData = (notToClear: string) => {
  const allKeys = [
    "cachedCart",
    "cachedOrders",
    "cachedProducts",
    "cachedWishlist",
  ];

  const keysToClear = allKeys.filter((key) => {
    return key !== notToClear;
  });

  keysToClear.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const clearAllData = () => {
  const allKeys = [
    "cachedCart",
    "cachedOrders",
    "cachedProducts",
    "cachedWishlist",
  ];

  allKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const getHrsMinSec = (orderId: string) => {
  return orderId.split("-")[1];
};

export const sortOrderByDate = (orders: OrdersData[]) => {
  return orders.sort((a, b) => {
    if (a.orderDate === b.orderDate) {
      const aDate = Number(getHrsMinSec(a.orderId));
      const bDate = Number(getHrsMinSec(b.orderId));

      return bDate - aDate;
    }
    const aDate = new Date(a.orderDate).getTime();
    const bDate = new Date(b.orderDate).getTime();

    return bDate - aDate;
  });
};

export const pawBuddyLogError = (moduleName: string, msg: any) => {
  console.log(`Error in ${moduleName} : ${msg}`);
};

export const pawBuddyLogInfo = (moduleName: string, msg: any) => {
  console.log(`FYI ${moduleName} : ${msg}`);
};

export const getDiscountedPrice = (price: string, discount: string) => {
  const priceBeforeDis = Number(price) * Number(discount);
  const finalPrice = Number(price) - priceBeforeDis / 100;
  return finalPrice.toString();
};

export const getMonthNumber = (month: string): string => {
  const months: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  return months[month];
};
export const getPaymentId = (orderId: string) => {
  const cleanOrderId = orderId.replace(/-/g, "");
  const timestamp = moment().format("HHmm");
  return `${cleanOrderId}${timestamp}`;
};
