import React from "react";
import FoodMenu from "./FoodMenu";

import Form from "./RegistrationForm";
import foodChartLst from "../config/foodChartLst"
import paymentMethods from "../config/paymentMethods";
import PaymentMethod from "./PaymentMethod";

function App() {


  const buildFoodMenu = (menuItem) =>
    <FoodMenu
      key={menuItem._id}
      id={menuItem._id}
      category={menuItem.category}
      itemName={menuItem.itemName}
      discount={menuItem.discount}
      image={menuItem.image}
      price={menuItem.price}
    />

  const buildPaymentMenu = (menuItem) =>
    <PaymentMethod
      key={menuItem._id}
      id={menuItem._id}
      name={menuItem.name}
      options={menuItem.options}
    />

  return (
    <div >
      <h1>  Cafeteria</h1>
      <Form />
      {foodChartLst.map(buildFoodMenu)}
      {paymentMethods.map(buildPaymentMenu)}

    </div>
  );
}

export default App;
