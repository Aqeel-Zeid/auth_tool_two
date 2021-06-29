import Moveable from "react-moveable";

import React, { useState } from "react";
import frame from "./frame.svg";
import dragImage from "./dragImage.png";


import Store from "./state/store";



import DroppableElement from "./Components/DroppableElement";
import { RootContainer } from "./RootContainer";



import { NavigatorBar } from "./NavigatorBar";

export function ToolBar({ children }) {
  return (
    <div
      style={{
        width: "100vw",
        padding: "0.5em",
        backgroundColor: "antiquewhite",
        display: "flex",
        justifyContent: "flex-start",
        position: "stick",
      }}
    >
      <DroppableElement
        key="a1"
        origin="TOP_TOOLBAR"
        droppingElementData={{
          h: 10,
          w: 10,
          dragImage: dragImage,
        }}
      >
        <div
          style={{
            padding: "1em",
            marginLeft: "1em",
            marginRight: "1em",
            backgroundColor: "chartreuse",
          }}
        >
          <img src={frame} height="20em" width="40em" draggable={false} />
        </div>
      </DroppableElement>
      <DroppableElement
        key="a2"
        origin="TOP_TOOLBAR"
        droppingElementData={{
          h: 20,
          w: 20,
          dragImage: dragImage,
        }}
      >
        <div
          style={{
            padding: "1em",
            marginLeft: "1em",
            marginRight: "1em",
            backgroundColor: "thistle",
          }}
        >
          <img src={frame} height="20em" width="40em" draggable={false} />
        </div>
      </DroppableElement>
    </div>
  );
}

function App() {
  return (
    <Store>
        <RootContainer ContainerName="RootContainer" style = {{ zIndex : 10  }} />
    </Store>
  );
}

export default App;
