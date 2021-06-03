import React, { createContext, useReducer } from "react";
import Reducer from "./reducer.js";

const initialState = {
  rootContainer : {
    gridUnit: 48 ,
    containerName : "RootContainer" 
  },   
  nonRootContainers: {
    "id001" : {
        id : "adscewecewtwet",
        x : 0,
        y: 0,
        w: 5,
        h: 5,
        containerName: "RootContainer"   
    }
  }
   
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;