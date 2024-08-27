export const generateRandomUserId = () => {
  const min = Math.pow(10, 11);
  const max = Math.pow(10, 12) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
