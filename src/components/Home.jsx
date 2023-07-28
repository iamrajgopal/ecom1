import React, { useState } from "react";
import Navbar from "./features/Navbar";
import Productlist from "./features/Productslist";
// import Form from './testing/Form'
// import Form2 from "./testing/Form2";
import Crud from "./features/Crud";
import Gridtest from "./testing/Gridtest";

function Home() {
  const [showProductList, setShowProductList] = useState("");

  const handleProductsButtonClick = (page) => {
    setShowProductList(page);
  };
  

  let renderComponents = () => {
    switch (showProductList) {
      case "Products":
        return <Productlist></Productlist>;
        case "Crud":
        return <Crud></Crud>;
        case "Blog":
        return <Gridtest></Gridtest>
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar onProductsButtonClick={handleProductsButtonClick} />
      {renderComponents()}
      {/* <Form2></Form2> */}
    </>
  );
}

export default Home;
