import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { motion } from "framer-motion";
import toppingImages from "./images";
import logo from "../../assets/logo.png";

/**
 * Page where customer users can select their order's drizzle(s)
 *
 */
export default function Drizzles() {
  // prep-drizzle data
  const {
    sauces,
    drizzles,
    meats,
    veggies,
    selectedItems,
    setSelectedItems,
    prepSelectedItems,
    setPrepSelectedItems,
  } = useContext(GlobalContext);
  const [selectedDrizzles, setSelectedDrizzles] = useState(drizzles);
  const [selectedVeggies, setSelectedVeggies] = useState(veggies);
  const [selectedMeats, setSelectedMeats] = useState(meats);
  const [selectedSauce, setSelectedSauce] = useState(sauces);
  let [toppingList, setToppingList] = useState([[], [], [], []]);
  let drizzlesTextFormatted = [];
  for (let i = 0; i < selectedDrizzles.length; ++i) {
    let formatText = selectedDrizzles[i].label;
    formatText = formatText.replace("_", " ");
    const texts = formatText.split(" ");
    if (texts[0] === "Bbq") {
      texts[0] = "BBQ";
    }
    for (let j = 0; j < texts.length; ++j) {
      texts[j] = texts[j][0].toUpperCase() + texts[j].substr(1);
    }
    drizzlesTextFormatted.push(texts.join(" "));
  }

  // Render Page
  useEffect(() => {
    const data = localStorage.getItem("selected-drizzles");
    const meatData = localStorage.getItem("selected-meats");
    const veggieData = localStorage.getItem("selected-veggies");
    const sauceData = localStorage.getItem("selected-sauce");

    if (veggieData) {
      setSelectedVeggies(JSON.parse(veggieData));
    } else {
      for (let i = 0; i < selectedVeggies.length; i++) {
        selectedVeggies[i].selected = "";
      }
      setSelectedVeggies(JSON.parse(JSON.stringify(selectedVeggies)));
    }

    if (sauceData) {
      setSelectedSauce(JSON.parse(sauceData));
    } else {
      for (let i = 0; i < selectedSauce.length; i++) {
        selectedSauce[i].selected = "";
      }
      setSelectedSauce(JSON.parse(JSON.stringify(selectedSauce)));
    }

    if (meatData) {
      setSelectedMeats(JSON.parse(meatData));
    } else {
      for (let i = 0; i < selectedMeats.length; i++) {
        selectedMeats[i].selected = "";
      }
      setSelectedMeats(JSON.parse(JSON.stringify(selectedMeats)));
    }

    if (data) {
      setSelectedDrizzles(JSON.parse(data));
    } else {
      for (let i = 0; i < selectedDrizzles.length; i++) {
        selectedDrizzles[i].selected = "";
      }
      setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
    }

    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        document.getElementById(selectedDrizzles[i].value).checked = true;
      } else {
        document.getElementById(selectedDrizzles[i].value).checked = false;
      }
    }
  }, []);

  // THIS IS HORRIBLE
  let [useEffectCount, setUseEffectCount] = useState(0);
  useEffect(() => {
    if (useEffectCount < 5) {
      toppingList = [[], [], [], []];
      for (let i = 0; i < selectedSauce.length; i++) {
        if (selectedSauce[i].selected === "checked") {
          toppingList[0].push(selectedSauce[i].label);
        }
      }
      for (let i = 0; i < selectedMeats.length; i++) {
        if (selectedMeats[i].selected === "checked") {
          toppingList[1].push(selectedMeats[i].label);
        }
      }

      for (let i = 0; i < selectedVeggies.length; i++) {
        if (selectedVeggies[i].selected === "checked") {
          toppingList[2].push(selectedVeggies[i].label);
        }
      }

      for (let i = 0; i < selectedDrizzles.length; i++) {
        if (selectedDrizzles[i].selected === "checked") {
          toppingList[3].push(selectedDrizzles[i].label);
        }
      }
      setToppingList(JSON.parse(JSON.stringify(toppingList)));
      useEffectCount = useEffectCount + 1;
      setUseEffectCount(useEffectCount);
    }
  }, [toppingList]);

  useEffect(() => {
    const showMeatVeggieOpt = JSON.parse(
      localStorage.getItem("selected-pizza")
    ).type;
    if (showMeatVeggieOpt === 1 || showMeatVeggieOpt === 2) {
      document.getElementById("nav-btn-all").style.display = "none";
      document.getElementById("nav-btn-sauces-drizzles").style.display = "flex";
    } else {
      document.getElementById("nav-btn-all").style.display = "flex";
      document.getElementById("nav-btn-sauces-drizzles").style.display = "none";
    }

    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        document.getElementById(selectedDrizzles[i].value).checked = true;
      } else {
        document.getElementById(selectedDrizzles[i].value).checked = false;
      }
    }
  });

  // routes
  const navigate = useNavigate();

  const goCustomer = () => {
    navigate("/customer");
  };

  const goSauces = () => {
    navigate("/sauces");
  };

  const goToppings = () => {
    navigate("/toppings");
  };

  const goVeggies = () => {
    navigate("/veggies");
  };

  const goDrizzles = () => {
    navigate("/drizzles");
  };

  // stores selected drizzle and update button
  const selectingDrizzles = async (event, index, id) => {
    if (selectedDrizzles[index].selected === "checked") {
      selectedDrizzles[index].selected = "";
      document.getElementById(id).checked = false;
    } else {
      selectedDrizzles[index].selected = "checked";
      document.getElementById(id).checked = true;
    }
    setSelectedDrizzles(JSON.parse(JSON.stringify(selectedDrizzles)));
    localStorage.setItem("selected-drizzles", JSON.stringify(selectedDrizzles));

    toppingList = [[], [], [], []];
    for (let i = 0; i < selectedSauce.length; i++) {
      if (selectedSauce[i].selected === "checked") {
        toppingList[0].push(selectedSauce[i].label);
      }
    }
    for (let i = 0; i < selectedMeats.length; i++) {
      if (selectedMeats[i].selected === "checked") {
        toppingList[1].push(selectedMeats[i].label);
      }
    }

    for (let i = 0; i < selectedVeggies.length; i++) {
      if (selectedVeggies[i].selected === "checked") {
        toppingList[2].push(selectedVeggies[i].label);
      }
    }

    for (let i = 0; i < selectedDrizzles.length; i++) {
      if (selectedDrizzles[i].selected === "checked") {
        toppingList[3].push(selectedDrizzles[i].label);
      }
    }
    setToppingList(JSON.parse(JSON.stringify(toppingList)));
  };

  // Delete Local Storage
  const resetStorage = () => {
    localStorage.removeItem("selected-meats");
    localStorage.removeItem("selected-veggies");
    localStorage.removeItem("selected-drizzles");
    localStorage.removeItem("selected-pizza");
    localStorage.removeItem("selected-sauce");
    localStorage.removeItem("sauce-count");
    localStorage.removeItem("topping-count");
  };
  // Add to Order Function
  const addOrder = () => {
    prepSelectedItems.push([]);
    var my_order = { type: "pizza", items: [] };
    prepSelectedItems[prepSelectedItems.length - 1].push(my_order);

    for (let i = 0; i < selectedSauce.length; ++i) {
      if (selectedSauce[i].selected === "checked") {
        if (selectedSauce[i].label != "no_sauce") {
          prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
            label: selectedSauce[i].label,
            value: selectedSauce[i].value,
            price: selectedSauce[i].price,
          });
        }
      }
    }

    for (let i = 0; i < selectedMeats.length; ++i) {
      if (selectedMeats[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedMeats[i].label,
          value: selectedMeats[i].value,
          price: selectedMeats[i].price,
        });
      }
    }

    for (let i = 0; i < selectedVeggies.length; ++i) {
      if (selectedVeggies[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedVeggies[i].label,
          value: selectedVeggies[i].value,
          price: selectedVeggies[i].price,
        });
      }
    }

    for (let i = 0; i < selectedDrizzles.length; ++i) {
      if (selectedDrizzles[i].selected === "checked") {
        prepSelectedItems[prepSelectedItems.length - 1][0].items.push({
          label: selectedDrizzles[i].label,
          value: selectedDrizzles[i].value,
          price: selectedDrizzles[i].price,
        });
      }
    }

    setPrepSelectedItems(prepSelectedItems);

    resetStorage();
    goCustomer();
  };

  const goCancel = () => {
    resetStorage();
    goCustomer();
  };

  return (
    <div className="w-screen overflow-y-show">
      <div className="flex justify-center mt-5">
      <img src={logo} alt="Spin 'N Stone Logo" className="h-16" />
      </div>
      {/* navigation bar */}
      <div className="flex flex-row mt-2 justify-end">
        <button
          className="bg-yellow-400 hover:bg-white hover:text-yellow-400 hover:border-yellow-400 hover:border-2 text-white p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={addOrder}
        >
          <h1 className="">Add to Order</h1>
        </button>
        <button
          className="bg-[#ED2939] hover:bg-white hover:text-[#ED2939] hover:border-[#ED2939] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl justify-center items-center whitespace-nowrap"
          onClick={goCancel}
        >
          <h1 className="">Cancel</h1>
        </button>
      </div>

      <div id="nav-btn-all" className="w-screen flex justify-right mt-2">
        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          Sauces
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goToppings}
        >
          Meats
        </button>

        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goVeggies}
        >
          Veggies
        </button>

        <button
          className="w-1/2 h-1 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrizzles}
        >
          Drizzles
        </button>
      </div>

      <div
        id="nav-btn-sauces-drizzles"
        className="w-screen flex justify-right mt-2"
      >
        <button
          className="w-1/2 h-1 bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goSauces}
        >
          Sauces
        </button>

        <button
          className="w-1/2 h-1 hover:bg-[#4FC3F7] bg-white text-[#4FC3F7] border-[#4FC3F7] border-2 hover:text-white font-bold mx-1 p-6 rounded-xl text-2xl flex justify-center items-center"
          onClick={goDrizzles}
        >
          Drizzles
        </button>
      </div>

      <div>
        <div className="inline-flex">
          <h1 class="text-3xl font-bold ml-10 mb-6 mt-10">Choose Drizzles</h1>
          <h2 class="text-3xl font-bold ml-2 mb-6 mt-10">(Pick Any)</h2>
        </div>
        <div className="grid lg:grid-cols-4">
          <div className="ml-12 grid lg:grid-cols-4 col-span-3 gap-3">
            {drizzles.map((drizzle, index) => (
              <div className="min-w-full">
                <input
                  type="checkbox"
                  class="hidden"
                  name="drizzle-btn"
                  onChange={(event) =>
                    selectingDrizzles(event, index, drizzle.value)
                  }
                  id={drizzle.value}
                />
                <label
                  class=""
                  for={drizzle.value}
                  className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border text-white font-bold p-24 rounded-lg text-l flex justify-center items-center min-h-full min-w-full whitespace-nowrap hover:text-3xl"
                >
                  {drizzlesTextFormatted[index]}
                </label>
              </div>
            ))}
          </div>
          {/* PIZZA ANIMATION HERE */}
          <div className="flex relative ml-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: true ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={require("../../assets/Nosauce.png")}
                class="h-64 absolute"
                alt=""
              />
            </motion.div>
            <div>
              {/* Generate Base Sauce */}
              {sauces.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedSauce[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[0][0].key[selectedSauce[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                  <img
                    src={require("../../assets/Basecheese.png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Meats */}
              {meats.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedMeats[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[1][0].key[selectedMeats[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Veggies */}
              {veggies.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedVeggies[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[2][0].key[selectedVeggies[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}

              {/* Generate Drizzles */}
              {drizzles.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      selectedDrizzles[index].selected === "checked" ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={require("../../assets/" +
                      toppingImages[3][0].key[selectedDrizzles[index].label] +
                      ".png")}
                    class="h-64 absolute"
                    alt=""
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-64 p-5 ">
              <div>
                {toppingList[0].map((item, index) => (
                  <label className="">
                    {(toppingList[0].length != 0 && index === 0
                      ? "Sauce: "
                      : "") +
                      item +
                      (index != toppingList[0].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>

              <div>
                {toppingList[1].map((item, index) => (
                  <label className="">
                    {(toppingList[1].length != 0 && index === 0
                      ? "Meat(s): "
                      : "") +
                      item +
                      (index != toppingList[1].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>

              <div>
                {toppingList[2].map((item, index) => (
                  <label className="">
                    {(toppingList[2].length != 0 && index === 0
                      ? "Veggie(s): "
                      : "") +
                      item +
                      (index != toppingList[2].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>
              <div>
                {toppingList[3].map((item, index) => (
                  <label className="">
                    {(toppingList[3].length != 0 && index === 0
                      ? "Drizzle(s): "
                      : "") +
                      item +
                      (index != toppingList[3].length - 1 ? ", " : "")}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
