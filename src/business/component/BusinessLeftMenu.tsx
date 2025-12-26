import { Container } from "@mui/material";
import homeIcon from "../../assets/home.png";
import addProduct from "../../assets/add-product.png";
import list from "../../assets/check-list.png";
import { CustomButton } from "../../commonFiles/commonTheme";
import { Link } from "react-router-dom";

const customButtonContainer = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  fontFamily: "cursive",
  color: "white",
};

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  marginTop: "5%",
  alignItems: "center",
};

const greyLine = {
  width: "95%",
  backgroundColor: "grey",
  height: "1px",
};

const greyText = {
  color: "grey",
  fontFamily: "cursive",
  fontSize: "12px",
};

export default function BusinessLeftMenu() {
  const version = "0.0.1";

  const businessMenu = [
    {
      header: "Add Product",
      image: addProduct,
      name: "add_product",
      path: "/business/add_product",
    },
    {
      header: "Listed Prodcts",
      image: list,
      name: "listed Products",
      path: "/business/listed_products",
    },
  ];

  const renderBusiness = () => {
    return (
      <>
        {businessMenu.map((obj, index) => (
          <Link to={obj.path} key={index}>
            <CustomButton>
              <div style={customButtonContainer}>
                <img
                  src={obj.image}
                  alt={`${obj.header} Icon`}
                  style={{
                    height: "1.6em",
                    margin: "0% 3% 1% 5%",
                  }}
                />
                {obj.header}
              </div>
            </CustomButton>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div
      className="left-menu-container"
      style={{
        backgroundColor: "#00111c",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        width: "17vw",
        marginLeft: "0%",
        height: "92vh",
        color: "white",
        padding: "0",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Container
        style={{
          height: "100%",
          width: "100%",
          padding: "0",
          marginTop: "2%",
        }}
      >
        <Link to={"/"}>
          <CustomButton>
            <div style={customButtonContainer}>
              <img
                src={homeIcon}
                alt="Home Icon"
                style={{
                  height: "1.6em",
                  margin: "0% 2% 1% 6%",
                }}
              />
              Home
            </div>
          </CustomButton>
        </Link>
        {renderBusiness()}
        <div style={flexCenter}>
          <div style={greyLine}></div>
        </div>
        <div style={Object.assign({}, flexCenter, greyText)}>
          © PawBuddy Version {version}
        </div>
      </Container>
    </div>
  );
}
