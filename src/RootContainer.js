import React, { useContext, useState } from "react";
import { Context } from "./state/store";
import NonRootContainer from "./Components/NonRootContainer";

import { NavigatorBar } from "./NavigatorBar";
import { MapInteractionCSS } from "react-map-interaction";

import DroppableElement from "./Components/DroppableElement";

import dragImage from "./dragImage.png";
import frame from "./frame.svg";

import ComponentBrowser from "./Components/PageEditor/ComponentBrowser";
import ComponentSettings from "./Components/ComponentSettings";


import Connector from "./Components/Connector";

export function RootContainer({ children, ContainerName }) {
  const [state, dispatch] = useContext(Context);

  let gridUnit = state.rootContainer.gridUnit;

  React.useEffect(() => {
    //console.log(state.nonRootContainers)
  }, [JSON.stringify(state.nonRootContainers)]);

  function selectRenderingComponent(componentType, id, elementData, origin) {
    if (origin === "BASIC_COMPONENT") {
      //    console.log("🚀 ~ file: RootContainer.js ~ line 15 ~ componentType", componentType)
      switch (componentType) {
        case "HEADING_1":
          return <> Heading 1</>;
        case "HEADING_2":
          return <> Heading 2</>;
        case "PARAGRAPH_1":
          return <> Paragraph</>;
        case "SMALL_IMAGE":
          return <> Small Image</>;
        case "SQUARE_IMAGE":
          return <> Square Image </>;
        case "BASIC_BUTTON":
          return <> Basic Button </>;
        default:
          throw Error(
            "Component Type Undefined , Cannot Render Component without knowing which component type to render"
          );
      }
    } else if (origin === "SECTION_COMPONENT") {
      switch (componentType) {
        case "ACTION_ARTICLE":
          return <> Action Article</>;
        case "BASIC_LIST":
          return <> basic List</>;
        default:
          throw Error(
            "Component Type Undefined , Cannot Render Component without knowing which component type to render"
          );
      }
    }
  }

  function makeid(length) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  React.useEffect(() => {
    //console.log(state, "State")
  }, [state.rootContainer.gridUnit]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    //console.log(e)
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let container = document.querySelector(`.${ContainerName}`);

    let XPosition = e.pageX;
    let YPosition = e.pageY - container.offsetTop;
    //console.log(container.offsetTop)
    //console.log("Dropped into Position , " , Math.round((e.pageX - container.offsetTop ) / (gridUnit)) , Math.round(e.pageY / (gridUnit)))
    console.log(
      "Dropped into Position , ",
      Math.ceil(XPosition / gridUnit),
      Math.ceil(YPosition / gridUnit)
    );

    let XCoordinate = Math.floor(XPosition / gridUnit) * gridUnit;
    let YCoordinate = Math.floor((YPosition - container.offsetTop) / gridUnit) * gridUnit;

    if (XPosition < gridUnit) {
      XCoordinate = 0;
    }

    if (YPosition < gridUnit) {
      YCoordinate = 0;
    }

    //console.log(XCoordinate,YCoordinate)
    let id = makeid(10);

    let droppingElementData = JSON.parse(
      e.dataTransfer.getData("application/x.droppingElementData")
    );

    let renderingComponent = selectRenderingComponent(
      droppingElementData.elementData.type,
      id,
      droppingElementData.elementData,
      droppingElementData.elementData.componentType
    );

    console.log(renderingComponent);

    dispatch({
      type: "ADD_NON_ROOT_CONTAINER_INTO_ROOT_CONTAINER",
      payload: {
        // Identifier Data
        id: id,
        containerName: state.rootContainer.containerName,
        parent: [state.rootContainer.containerName, id],

        // Position Data
        x: XCoordinate,
        lastX: XCoordinate,

        y: YCoordinate,
        lastY: YCoordinate,

        // Dimension Data
        w: droppingElementData.w,
        lastW: droppingElementData.w,

        h: droppingElementData.h,
        lastH: droppingElementData.h,

        //Element Data
        elementData: droppingElementData.elementData,

        children: {},
      },
    });

    dispatch({
      type: "SET_ACTIVE_CONTAINER",
      payload: id,
    });

    e.stopPropagation();
  };

  let renderArray = [];

  Object.keys(state.nonRootContainers).forEach((keyy) => {
    //console.log(state.nonRootContainers[keyy])

    let { id, x, y, w, h, containerName, parent, elementData } =
      state.nonRootContainers[keyy];
    if (id !== undefined) {
      let renderingComponent = selectRenderingComponent(
        elementData.type,
        id,
        elementData,
        elementData.componentType
      );

      let item = (
        <NonRootContainer
          key={id} //   id = {id}
          id={id}
          x={Math.ceil(x/gridUnit) * gridUnit}
          y={Math.ceil(y/gridUnit) * gridUnit}
          w={w}
          h={h}
          ContainerClassName={id}
          containerName={containerName}
          parent={parent}
          children={renderingComponent}
        />
      );
      renderArray.push(item);
    }
  });

  const [mapState, setMapState] = useState({
    scale: 1,
    translation: { x: 0, y: 0 },
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "blanchedalmond",
            width: "25%",
            maxWidth: "380px",
            zIndex : 101
          }}
        >
          <ComponentBrowser />
        </div>
        <div
          className={state.rootContainer.containerName}
          style={{
            height: "100vh",
            boxSizing: "border-box",
            flexGrow: "6",
            width: "50%",
          }}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onClick={() =>
            dispatch({
              type: "SET_ACTIVE_CONTAINER",
              payload: state.rootContainer.containerName,
            })
          }
        >
          {renderArray}
        </div>
        <div
          style={{
            backgroundColor: "burlywood",
            maxWidth: "400px",
            width: "25%",
            zIndex : 101
          }}
        >
          <ComponentSettings/>
        </div>
      </div>
    </>
  );
}
