import React, { useContext } from "react";
import DroppableElement from "./Components/DroppableElement";
import dragImage from "./dragImage.png";
import { Context } from "./state/store";

export function NavigatorBar() {
  
  const [state, dispatch] = useContext(Context);

  return (
  //   <div
  //     style={{
  //       display: "flex",
  //       width: "200px",
  //       padding: "16px",
  //       position: "fixed",
  //       backgroundColor: "burlywood",
  //       boxSizing: "border-box",
  //       bottom: "64px",
  //       left: "45%",
  //       zIndex : "200"
  //     }}
  //   >
  //     <button
  //       onClick={(e) =>
  //         {
  //           console.log("Zoom In ")
  //           dispatch({
  //           type: "SET_GRID_SIZE",
  //           payload: {
  //             gridUnit: 16,
  //           },
  //         })
  //         e.stopPropagation();
  //       }
          
  //       }
  //     >
  //       Zoom In
  //     </button>
  //     <button
  //         onClick={(e) =>
  //           {
  //             console.log("Zoom In ")
  //             dispatch({
  //             type: "SET_GRID_SIZE",
  //             payload: {
  //               gridUnit: 8,
  //             },
  //           })
  //           e.stopPropagation();
  //         }
            
  //         }
  //     > Zoom Out</button>
  //     <DroppableElement
  //       origin={"BOTTOM_MIDDLE_TOOLBAR"}
  //       droppingElementData={{
  //         dragImage: dragImage,
  //         h: 10,
  //         w: 10,
  //       }}
  //     >
  //       <div>Element</div>
  //     </DroppableElement>
  //   </div>
  // 
  <></>
  );
}
