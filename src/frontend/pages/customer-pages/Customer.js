import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import party from "party-js";
import "./customer_page.css";

export default function Customer() {
  // confetti
  useEffect(() => {
    document.querySelectorAll(".confetti-button").forEach((e) =>
      e.addEventListener("click", function (e) {
        party.confetti(this);
      })
    );
  }, []);

  // Save Pizza Type

  // preset data for button
  const pizza_type = [
    {
      name: "Orginial Cheese",
      type: 1,
      topping_amount: [0, 0],
    },
    {
      name: "Classic Pepproni",
      type: 2,
      topping_amount: [1, 1],
    },
    {
      name: "1-Topping",
      type: 3,
      topping_amount: [1, 1],
    },
    {
      name: "2-4 Topping",
      topping_amount: [2, 4],
    },
    // {
    //   name: "Featured Items",
    //   type: 5,
    //   topping_amount: [0, 4],
    // },
  ];

  // Routes
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const goCustomer = () => {
    navigate("/customer");
  };

  const goDrinks = () => {
    navigate("/drinks");
  };

  const goSauces = () => {
    setTimeout(() => navigate("/sauces"), 1000);
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  const selectingPizza = async (event, pizza) => {
    localStorage.setItem("selected-pizza", JSON.stringify(pizza));
    let count = 0;
    localStorage.setItem("topping-count", count);
    goSauces();
  };

  return (
    <div className="h-screen overflow-y-show">
      {/* TODO: add logo */}
      {/* navigation bar */}
      <div className="w-screen flex justify-start mt-16">
        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goHome}
        >
          Home
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goCustomer}
        >
          Pizza
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrinks}
        >
          Drinks
        </button>

        <button
          className="w-4.5 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-6 rounded-lg text-2xl flex justify-center items-center"
          onClick={goCheckout}
        >
          Checkout
        </button>
      </div>

      {/* choose pizza buttons */}
      {/* TODO: reformat and design buttons */}
      <div>
        <h1 class="text-3xl font-bold ml-20 mb-6 mt-10">Choose Pizza</h1>
        <div className="grid lg:grid-cols-4 mx-20 mt-5">
          {pizza_type.map((pizza) => (
            <div>
              {/* TODO: save pizza type */}
              <button
                className="w-5.0 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-auto my-5 p-20 rounded-lg text-l flex justify-center items-center confetti-button"
                name="pizza-btn"
                id={pizza.type}
                onClick={(event) => selectingPizza(event, pizza)}
              >
                {pizza.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
