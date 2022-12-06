import React from "react";

const GlobalContext = React.createContext({
  // all global states and their setter functions go here
  allOrders: [],
  setAllOrders: () => {},
  listOrders: [],
  setListOrders: () => {},
  allItems: [],
  listOrders: [],
  setListOrders: () => {},
  setAllItems: () => {},
  listItems: [],
  setListItems: () => {},
  doughs: [],
  setDoughs: () => {},
  sauces: [],
  setSauces: () => {},
  meats: [],
  setMeats: () => {},
  drizzles: [],
  setDrizzles: () => {},
  veggies: [],
  setVeggies: () => {},
  drinks: [],
  setDrinks: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  prepSelectedItems: [],
  setPrepSelectedItems: () => {},
  maxID: 0,
  setMaxID: () => {},
  showItemAdder: false,
  setShowItemAdder: () => {},
  zValue: "z-0",
  setZValue: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
  showItemEditor: false,
  setShowItemEditor: () => {},
  usedOAuth: false,
  setUsedOAuth: () => {},
});

export default GlobalContext;
