import React, { useContext, useState } from "react";
import { Context } from "./state/store";
import NonRootContainer from './Components/NonRootContainer';


import AssessmentComponentBar from "./Components/AssessmentComponents/AssessmentComponentBar";

import StepComponent from "./Components/AssessmentComponents/StepComponent";
import Response from "./Components/AssessmentComponents/Response";
import Message from "./Components/AssessmentComponents/Message";
import Timer from "./Components/AssessmentComponents/Timer";
import MessageAction from "./Components/AssessmentComponents/MessageAction";

import { MapInteractionCSS } from 'react-map-interaction';

import Connector from "./Components/Connector";


function selectRenderingComponent(componentType, id , elementData)
{
//    console.log("🚀 ~ file: RootContainer.js ~ line 15 ~ componentType", componentType)
    switch (componentType) {
        case "STEP":
            return <StepComponent id = {id} elementData = {elementData}/>
        case "RESPONSE":
            return <Response id = {id} elementData = {elementData}/>
        case "MESSAGE":
            return <Message id = {id} elementData = {elementData}/>
        case "TIMER":
            return <Timer id = {id} elementData = {elementData}/>
        case "MESSAGE_ACTION" :
            return <MessageAction id = {id} elementData = {elementData} />
        default:
            throw Error("Component Type Undefined , Cannot Render Component without knowing which component type to render")
            
    }
}


export function RootContainer({ children, ContainerName }) {

    const [state, dispatch] = useContext(Context);

    let gridUnit = state.rootContainer.gridUnit;

    React.useEffect(() => {
        //console.log(state.nonRootContainers)
    }, [JSON.stringify(state.nonRootContainers)]);

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


    React.useEffect(() => {
        //console.log(state, "State")
    }, [state.rootContainer.gridUnit]);

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
        console.log("Dropped into Position , ", Math.ceil(XPosition / (gridUnit)), Math.ceil(YPosition / (gridUnit)));

        let XCoordinate = Math.floor(XPosition / (gridUnit));
        let YCoordinate = Math.floor((YPosition - container.offsetTop) / (gridUnit));

        if (XPosition < gridUnit) { XCoordinate = 0; }

        if (YPosition < gridUnit) { YCoordinate = 0; }


        //console.log(XCoordinate,YCoordinate)  
        let id = makeid(10);

        let droppingElementData = JSON.parse(e.dataTransfer.getData("application/x.droppingElementData"));

        try {
            let renderingComponent = selectRenderingComponent(droppingElementData.elementData.componentType, id , droppingElementData.elementData)
            console.log(renderingComponent)
    
            dispatch({
                type: "ADD_NON_ROOT_CONTAINER_INTO_ROOT_CONTAINER", payload: {
                    
                    // Identifier Data 
                    id: id,
                    containerName: state.rootContainer.containerName,
                    parent: [state.rootContainer.containerName, id],

                    // Position Data
                    x: XPosition,
                    lastX: XPosition,
    
                    y: YPosition,
                    lastY: YPosition,
    
                    // Dimension Data
                    w: droppingElementData.w,
                    lastW: droppingElementData.w,
    
                    h: droppingElementData.h,
                    lastH: droppingElementData.h,
    
                    //Element Data
                    elementData : droppingElementData.elementData,
                    
                    children: {}
                }
            });
    
            dispatch({
                type: "SET_ACTIVE_CONTAINER",
                payload: id
            });


        } catch (error) {
            console.log(error)        
        }
        
       


        e.stopPropagation();
    };

    let renderArray = [];


    Object.keys(state.nonRootContainers).forEach(
        (keyy) => {
            //console.log(state.nonRootContainers[keyy])
        
            let { id, x, y, w, h, containerName, parent, elementData } = state.nonRootContainers[keyy];
            let renderingComponent = selectRenderingComponent(elementData.componentType, id , elementData)
            
//            console.log("🚀 ~ file: RootContainer.js ~ line 161 ~ RootContainer ~ renderingComponent", renderingComponent)

            
            let item = <NonRootContainer
                key={id} //   id = {id}
                id={id}
                x={x}
                y={y}
                w={w}
                h={h}
                ContainerClassName={id}
                containerName={containerName}
                parent={parent}
                children={renderingComponent} />;
            renderArray.push(item);
        }
    );


    const [mapState, setMapState] = useState({
        scale : 1,
        translation: { x: 0, y: 0 }
    })

    return (
        <>

            <div
                className={state.rootContainer.containerName}
                style={{ width: "100vw", height: "100vh", position: "absolute", boxSizing: "border-box" }}
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
                onClick={() => dispatch({
                    type: "SET_ACTIVE_CONTAINER",
                    payload: state.rootContainer.containerName
                })}
            >
                <AssessmentComponentBar/>                
                <div className = "outsideDraggableArea"></div>
                <MapInteractionCSS
                    value = {mapState}
                    onChange={(value) => setMapState(value)}
                    showControls = {false}
                    disableZoom = { (state.rootContainer.containerName !== state.activeContainer) ? true : true  }
                    disablePan = { (state.rootContainer.containerName !== state.activeContainer) ? true : false  }
                >
                   
                        {renderArray}   
                        {
                            state.connections.map(
                                connector => <Connector
                                    start = {connector.start}
                                    end = {connector.end}
                                    label = {connector.label}
                                />
                            )
                        }
                </MapInteractionCSS> 
            </div>

        </>
    );
}
