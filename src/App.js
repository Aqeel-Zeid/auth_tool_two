import Moveable from "react-moveable";

import React, { useState, useContext } from "react"
import frame from "./frame.svg"
import dragImage from "./dragImage.png"
import dragImageWarning from "./dragImageWarning.png"

import Store from "./state/store"
import { Context } from "./state/store"

import useStateRef from 'react-usestateref'

export function ToolBar({ children }) {

  return (
    <div style={{ width: "100vw", padding: "0.5em", backgroundColor: "antiquewhite", display: "flex", justifyContent: "flex-start" }}>
      <ToolBarElementForContiner id={'d'} />
    </div>
  )

}

export function ToolBarElement({ children, id }) {



  return (
    <div
      style={{ padding: "1em", marginLeft: "1em", marginRight: "1em", backgroundColor: "bisque" }}
      draggable={true}
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "copy";
        var img = new Image();
        img.src = dragImage;
        e.dataTransfer.setDragImage(img, 0, 0);
        e.dataTransfer.setData("application/x.itemType", "NON_CONTAINER");
      }}
      id={id}
    >
      <img src={frame} height="20em" width="40em" draggable={false} />
    </div>
  )

}

export function ToolBarElementForContiner({ children, id }) {

  return (
    <div
      style={{ padding: "1em", marginLeft: "1em", marginRight: "1em", backgroundColor: "coral" }}
      draggable={true}
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.dropEffect = "copy";
        var img = new Image();
        img.src = dragImage;
        e.dataTransfer.setDragImage(img, 0, 0);
        e.dataTransfer.setData("application/x.itemType", "CONTAINER");
      }}
      id={id}
    >
      <img src={frame} height="20em" width="40em" draggable={false} />
    </div>
  )

}


export function NonRootContainer({ w, h, x, y, id, containerName }) {

  const [state, dispatch] = useContext(Context);



  let gridUnit = Number(state.rootContainer.gridUnit);

  // - When A Child is inside of a Non-root parent Container
  // - It Should move with the parent 
  // - Should not resize when parent reizes
  // - The Z index should be greater than parent 
  // - Must be able to move freely within container
  // - Must be bounded within the container  

  const [target, setTarget] = React.useState();
  const [container, setContainer] = React.useState();


  React.useEffect(() => {
    //setFrame({...frame, translate : [0,0]})
    console.log("Changed Actice Container")
  }, [ state.activeContainer ])



  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%",
  });

  const [recentFrame, setRecentFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%",
  });

  const [activateDrag, setActivateDrag] = useState(false)

  const [isMovable, setIsMovable] = useState(true)

  const [dragDirection, setDragDirection] = useState([0, 0])

  React.useEffect(() => {
    console.log(gridUnit)
    setTarget(document.querySelector(`#${id}`));
    setContainer(document.querySelector(`.${containerName}`))
  }, []);

  let moveSettings = <Moveable
    target={target}
    resizable={true}
    draggable={true}
    throttleDrag={false}
    keepRatio={false}
    originDraggable={false}
    originRelative={true}
    throttleResize={false}
    renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
    edge={true}
    zoom={1}
    origin={true}
    padding={{ "left": 0, "top": 0, "right": 0, "bottom": 0 }}
    onDragOriginStart={e => {
      e.dragStart && e.dragStart.set(frame.translate);
    }}
    onDragOrigin={e => {
      frame.translate = e.drag.beforeTranslate;
      frame.transformOrigin = e.transformOrigin;
    }}
    onDragStart={e => {
      e.set(frame.translate);
      
    }}
    onDrag={e => {
      console.log(e.beforeTranslate, frame)
      frame.translate = e.beforeTranslate;

    }}


    onDragEnd={

      e => {

            let container = document.querySelector(`.${containerName}`);
            let containerY = container.getBoundingClientRect().y

          let childContainerBounds = document.querySelector(`#${id}`).getBoundingClientRect()

          console.log(childContainerBounds)

          //-----------------------------FIX ME WITH NESTED ELEMENTS-----------------------------------------------------------------------------------------------------------------------

          // console.log(childContainerBounds.y - containerY, childContainerBounds.x )
          //   dispatch(
          //   {
          //     type: "ADJUST_NON_ROOT_CONTAINER_LOCATION",
          //     payload:
          //     {
          //       id: id,
          //       x: childContainerBounds.x ,
          //       y: childContainerBounds.y - containerY 
          //     }
          //   })

          //-----------------------------FIX ME WITH NESTED ELEMENTS-----------------------------------------------------------------------------------------------------------------------

      }



    }

    onResizeStart={e => {
      e.setOrigin(["%", "%"]);
      e.dragStart && e.dragStart.set(frame.translate);
      // e.dataTransfer.getData("application/x.itemType");
      setDragDirection(e.direction)

    }}
    onResize={e => {
      const beforeTranslate = e.drag.beforeTranslate;

      frame.translate = beforeTranslate;
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}

    onResizeEnd={
      e => {
        //console.log(dragDirection)

        try {
          // let calculatedWith = Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit
          // let calculatedHeight = Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit

          //console.log("Calcualted With", (Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit) ,  w * gridUnit)
          // console.log("Calcualted Height",  (Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit) ,  h * gridUnit)

          // e.target.style.width = `${ Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit}px`;
          // e.target.style.height = `${Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit}px`;

          if (dragDirection[0] === 1 && dragDirection[1] === 0) // Resized Vertically
          {
            e.target.style.width = `${Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit}px`;
            //e.target.style.height = `${Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit}px`;
          } else if (dragDirection[0] === 0 && dragDirection[1] === 1) //Resized Horizontally
          {
            //e.target.style.width = `${ Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit}px`;
            e.target.style.height = `${Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit}px`;
          }
          else //Resized In Both axis
          {
            e.target.style.width = `${Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit}px`;
            e.target.style.height = `${Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit}px`;
          }



          //console.log(e, "On Resize End")

        } catch (error) {
          console.log(error)
        }


      }

    }

    onRender={e => {
      const { translate, rotate, transformOrigin } = frame;
      //console.log(Math.ceil(translate[0] / gridUnit) * gridUnit, Math.ceil(translate[1] / gridUnit) * gridUnit)

      let container = document.querySelector(`.${containerName}`);
      let containerY = container.getBoundingClientRect().y

      let childContainer = document.querySelector(`#${id}`)
      let childContainerBounds = childContainer.getBoundingClientRect();


      e.target.style.transformOrigin = transformOrigin;
      e.target.style.transform = `translate(${Math.ceil(translate[0] / gridUnit) * gridUnit}px, ${Math.ceil(translate[1] / gridUnit) * gridUnit}px)`
        + ` rotate(${rotate}deg)`;

    }}
  />

  let renderArray = [];

  //console.log(state.nonRootContainers[id].children)

  try {
    Object.keys(state.nonRootContainers[id].children).forEach(
      (keyy) => {
    
        let { x, y, w, h, containerName } = state.nonRootContainers[id].children[keyy];
        let item = <NonRootContainer
          key={keyy}                            //   id = {id}
          id={keyy}
          x={x}
          y={y}
          w={w}
          h={h}
          ContainerClassName={id}
          containerName={containerName}
        />
        renderArray.push(item)
        
      }
    )
  
    console.log(renderArray)
  } catch (error) {
    console.log(error)
  }



  return (
    <>
      <div
        onDoubleClick = { e => {
          console.log(e.target.id, "Double Click")
          dispatch({type : "SET_ACTIVE_CONTAINER", payload : e.target.id})
        }}
        style={{
          padding: "1em",
          backgroundColor: "honeydew",
          width: `${gridUnit * w}px`,
          height: `${gridUnit * h}px`,
          position: "absolute",
          top: `${Math.floor(y/gridUnit) * gridUnit}px`,
          left: `${Math.floor(x/gridUnit) * gridUnit}px`,
          borderStyle : "dashed",
          borderColor : "grey"
        }}
        className={id}
        id={id}
        onClick={() => { setActivateDrag(!activateDrag) }}
      >
        {
            renderArray
        }
      </div>
      {(state.activeContainer === id) ? moveSettings : <></>}

    </>
  )
}




export function RootContainer({ children, ContainerName }) {

  const [state, dispatch] = useContext(Context);

  const [renderItems, setRenderItems] = useStateRef([])

  const [update, setUpdate] = React.useState(false)

  React.useEffect(() => {
    console.log(state.nonRootContainers)
  }, [JSON.stringify(state.nonRootContainers)])

  function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  const [gridUnit, setGridUnit] = React.useState(50)

  const [gridItems, setGridItems] = React.useState([])

  React.useEffect(() => {
    console.log(gridItems)

  }, [update])

  React.useEffect(() => {
    console.log(state, "State")

  }, [])

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    //console.log(e)

    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    let container = document.querySelector(`.${ContainerName}`);

    let XPosition = e.pageX;
    let YPosition = e.pageY - container.offsetTop;
    //console.log(container.offsetTop)
    //console.log("Dropped into Position , " , Math.round((e.pageX - container.offsetTop ) / (gridUnit)) , Math.round(e.pageY / (gridUnit)))
    console.log("Dropped into Position , ", Math.ceil(XPosition / (gridUnit)), Math.ceil(YPosition / (gridUnit)))

    let XCoordinate = Math.floor(XPosition / (gridUnit));
    let YCoordinate = Math.floor((YPosition - container.offsetTop )/ (gridUnit))

    if (XPosition < gridUnit) { XCoordinate = 0 }

    if (YPosition < gridUnit) { YCoordinate = 0 }


    console.log(XCoordinate,YCoordinate)  

    let id = makeid(10)

    let itemType = e.dataTransfer.getData("application/x.itemType");

    let generatedKey = Math.random() * (9999 - 1) + 1

    dispatch({
      type: "ADD_NON_ROOT_CONTAINER", payload: {
        id: id,
        x: XPosition,
        lastX : XPosition,
        y: YPosition,
        lastY : YPosition,
        w: 10,
        h: 10,
        containerName: "RootContainer", 
        children:
        {
          "aosdnu": {
            id: "aosdnu",
            x: 0,
            y: 0,
            w: 5,
            h: 5,
            containerName: "RootContainer"
          }
        }
      }
    })

    dispatch({
      type : "SET_ACTIVE_CONTAINER",
      payload : id
    })

    // setGridItems([...gridItems,
    // {
    //   x: Math.floor(XPosition / (gridUnit)),
    //   y: Math.floor(YPosition / (gridUnit)),
    //   w: 5,
    //   h: 5,
    //   gridUnit: gridUnit,
    //   key: generatedKey,
    //   id: id,
    //   ContainerName: ContainerName,
    //   ContainerClassName: "NewContainer",
    //   gridItems: gridItems,
    //   setGridItems: setGridItems,
    // }
    // ])




    // setUpdate(!update)

    //console.log("Grid Items", gridItems)
    //setState(JSON.stringify(gridItems))
    e.stopPropagation();
  };

  let renderArray = [];

  Object.keys(state.nonRootContainers).forEach(
    (keyy) => {
      //console.log(state.nonRootContainers[keyy])
      let { id, x, y, w, h, containerName } = state.nonRootContainers[keyy];
      let item = <NonRootContainer
        key={id}                            //   id = {id}
        id={id}
        x={x}
        y={y}
        w={w}
        h={h}
        ContainerClassName={id}
        containerName={containerName}
      />
      renderArray.push(item)

    }
  )

  return (
    <>
      <ToolBar />
      <div
        className={ContainerName}
        style={{ width: "100vw", height: "100vh", position: "absolute" }}
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
      >
        {
          renderArray
        }
      </div>
    </>
  )
}



function App() {


  return (
    <Store>
      <RootContainer ContainerName="RootContainer" />
    </Store>
  )
}

export default App;




