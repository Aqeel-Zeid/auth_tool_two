import React, { useState, useContext } from 'react'
import { Context } from "../state/store"
import Slot from './Slot'

import { ArcherElement } from "react-archer"
import Moveable from 'react-moveable'

export default function NonRootContainer({ w, h, x, y, id, containerName, parent, children }) {


console.log("🚀 ~ file: NonRootContainer.jsx ~ line 9 ~ NonRootContainer ~ children", children)

  const [state, dispatch] = useContext(Context);


  let gridUnit = Number(state.rootContainer.gridUnit);

  const [target, setTarget] = React.useState();
  const [container, setContainer] = React.useState();


  React.useEffect(() => {

  }, [state.activeContainer])



  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%",
  });


  const [dragDirection, setDragDirection] = useState([0, 0])

  React.useEffect(() => {
    //console.log(gridUnit)
    setTarget(document.querySelector(`#${id}`));
    setContainer(document.querySelector(`.${containerName}`))


  }, []);


  //calculateBounds(parent)

  let moveSettings = <Moveable
    target={target}
    resizable={false}
    draggable={true}
    snappable={true}
    //bounds={calculateBounds(parent)}
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
      //console.log(e.beforeTranslate, frame)
      frame.translate = e.beforeTranslate;

    }}
    onDragEnd={

      e => {

        let container = document.querySelector(`.${containerName}`);
        let containerY = container.getBoundingClientRect().y

        let childContainerBounds = document.querySelector(`#${id}`).getBoundingClientRect()

        let translateProperties = container.getAttribute('transform');


        console.log(translateProperties)

        dispatch(
          {
            type: "ADJUST_NON_ROOT_CONTAINER_LOCATION",
            payload:
            {
              path: parent,
              x: (childContainerBounds.x),
              y: (childContainerBounds.y - containerY)
            }
          })
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

          let calculatedWith = Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit
          let calculatedHeight = Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit

          //console.log("Calcualted With", (Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit) ,  w * gridUnit)
          // console.log("Calcualted Height",  (Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit) ,  h * gridUnit)

          // e.target.style.width = `${ Math.ceil(e.lastEvent.width / (gridUnit)) * gridUnit}px`;
          // e.target.style.height = `${Math.ceil(e.lastEvent.height / (gridUnit)) * gridUnit}px`;

          console.log(calculatedHeight / gridUnit, calculatedWith / gridUnit)

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

          dispatch(
            {
              type: "ADJUST_NON_ROOT_CONTAINER_DIMENTION",
              payload:
              {
                path: parent,
                h: calculatedHeight / gridUnit,
                w: calculatedWith / gridUnit
              }
            })

          //console.log(e, "On Resize End")

        } catch (error) {
          //console.log(error)
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


  const findCompoundReference = (path, object) => {

    let compoundReference = object;

    let pathWithoutRoot = path.slice(1)

    for (let i = 0; i < pathWithoutRoot.length; i++) {
      if (i === 0) {
        compoundReference = compoundReference[`${pathWithoutRoot[i]}`]
      }
      else {
        compoundReference = compoundReference.children[`${pathWithoutRoot[i]}`]
      }
    }

    return compoundReference

  }

  const handleDrop = e => {
    e.preventDefault();
    let container = document.querySelector(`.${id}`);

    let rootContainerOffset = document.querySelector(`.${state.rootContainer.containerName}`)

    let XPosition = e.pageX - container.offsetLeft - rootContainerOffset.offsetLeft;
    let YPosition = e.pageY - container.offsetTop - rootContainerOffset.offsetTop;
    //console.log(container.offsetTop)
    //console.log("Dropped into Position , " , Math.round((e.pageX - container.offsetTop ) / (gridUnit)) , Math.round(e.pageY / (gridUnit)))
    console.log("Dropped into Position , ", Math.ceil(XPosition / (gridUnit)), Math.ceil(YPosition / (gridUnit)))
    console.log("Dropped inside , ", id)


    let XCoordinate = Math.floor(XPosition / (gridUnit));
    let YCoordinate = Math.floor((YPosition - container.offsetTop) / (gridUnit))

    if (XPosition < gridUnit) { XCoordinate = 0 }

    if (YPosition < gridUnit) { YCoordinate = 0 }


    //console.log(XCoordinate,YCoordinate)  

    let myId = makeid(10)

    let itemType = e.dataTransfer.getData("application/x.origin");

    let generatedKey = Math.random() * (9999 - 1) + 1



    dispatch({
      type: "ADD_NON_ROOT_CONTAINER_INTO_NON_ROOT_CONTAINER", payload: {
        id: myId,
        x: XPosition,
        lastX: XPosition,
        y: YPosition,
        lastY: YPosition,
        w: 10,
        lastW: 10,
        h: 10,
        lastH: 10,
        containerName: "RootContainer",
        parent: [...parent, myId],
        children: {}
      }
    })

    dispatch({
      type: "SET_ACTIVE_CONTAINER",
      payload: id
    })


    e.stopPropagation();
  };



  try {

    let compoundReference = findCompoundReference(parent, state.nonRootContainers)


    //console.log(id, parent, compoundReference.children)

    Object.keys(compoundReference.children).forEach(
      (keyy) => {
        //console.log(compoundReference.children[keyy], keyy)
        let { id, x, y, w, h, containerName, parent, children } = compoundReference.children[keyy];
        let item = <NonRootContainer
          key={id}                            //   id = {id}
          id={id}
          x={x}
          y={y}
          w={w}
          h={h}
          ContainerClassName={id}
          containerName={containerName}
          parent={parent}
          children={{}}
        />
        renderArray.push(item)

      }
    )

    //console.log(renderArray)
  } catch (error) {
    console.log(error)
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  return (
    <>
      <div
        style={{
          padding: "1em",
          backgroundColor: getRandomColor(),
          width: `${gridUnit * w}px`,
          height: `${gridUnit * h}px`,
          position: "absolute",
          top: `${y / gridUnit * gridUnit}px`,
          left: `${x / gridUnit * gridUnit}px`,

        }}
        className={id}
        id={id}
        onClick={(e) => {
          dispatch({ type: "SET_ACTIVE_CONTAINER", payload: e.target.id })
          e.stopPropagation()
        }}
        onDrop={e => handleDrop(e)}
      >
        {
          renderArray
        }
        {
          children
        }
      </div>
      {(state.activeContainer === id) ? moveSettings : <></>}

    </>
  )
}
