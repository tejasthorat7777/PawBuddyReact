interface URLProperties {
  menu: string;
}
type URLMap = {
  [key: string]: URLProperties;
};
type GetMenuFunction = (url: string) => URLProperties | undefined;

const getMenu: GetMenuFunction = (url: string) => {
  const URLS: URLMap = {
    "/": {
      menu: "/",
    },
    "/dogfood/dryfood": {
      menu: "/dogfood/dryfood",
    },
  };
  const page = URLS[url];
  try {
    if (page) {
      return page;
    }
    if (url.slice(-1) === "/") {
      return getMenu(url.substring(0, url.length - 1));
    }
    throw new Error();
  } catch (error) {
    console.log("ERROR in Page");
  }
};

function generateRandomUserId() {
  const min = Math.pow(10, 11); 
  const max = Math.pow(10, 12) - 1; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getMenu, generateRandomUserId };
