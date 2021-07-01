import React, { createContext, useReducer } from "react";
import Reducer from "./reducer.js";




const initialState = {
  rootContainer : {
    gridUnit: 8 ,
    containerName : "RootContainer" 
  },   
  nonRootContainers: {},
  activeContainer : "",
  sourceConnector : "NON_SELECTED",
  targetConnector : "NON_SELECTED",
  connections : [] ,
};



const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  
 
  if(localStorage.getItem("history") === null)
  {
      let historyArray = [];
      historyArray[0] = initialState
      localStorage.setItem("history", JSON.stringify(historyArray))
  }
  else{
    let history = JSON.parse(localStorage.getItem("history"))
    //console.log(history.length)
  }

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;



    

    