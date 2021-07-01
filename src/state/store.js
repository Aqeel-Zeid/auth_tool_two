import React, { createContext, useReducer } from "react";
import Reducer from "./reducer.js";


let data = [
  {
      name : "Page 1",
      type : "page",
      thumbnail : "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" , 
      subComponents : {
          "page section A1" : {
              actions : [
                  {
                      type : "CLICK",
                      value : "next page"
                  },
                  {
                      type : "SCROLL",
                      value : "60"
                  }
              ]
          },
          "page section B1" : {
              actions : [
                  {
                      type : "CLICK",
                      value : "previous page"
                  }
              ]
          }
      }
  },
  {
      name : "Page 2",
      type : "page",
      thumbnail : "" , 
      subComponents : {
          "page section A2" : {
              actions : [
                  {
                      type : "CLICK",
                      value : "next page"
                  },
                  {
                      type : "SCROLL",
                      value : "60"
                  }
              ]
          },
          "page section B2" : {
              actions : [
                  {
                      type : "CLICK",
                      value : "previous page"
                  }
              ]
          }
      }
  }
]



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
  data : data
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



    

    