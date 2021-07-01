import React from 'react'
import { useState, useContext } from 'react'
import DroppableElement from '../../DroppableElement'
import FixedSlot from './FixedSlot'

import dragImage from "../../../dragImage.png"
import reactDom from 'react-dom'

import {Context} from "../../../state/store"

export default function SlotsWithToolTips({ type, colour, id, gridclassName }) {

    const [showToolTip, setshowToolTip] = useState(false)

    const [toolTipCoordinates, setToolTipCoordinates] = useState({ x : 150 , y : 150})

    return (
        <div className={gridclassName}>
            <FixedSlot
                type={type}
                colour={colour}
                id={id}
                slotIdentifier={`${type}`}
                label={type.toLowerCase()}
                setshowToolTip={setshowToolTip}
                setToolTipCoordinates = {setToolTipCoordinates}
            />
            {
                showToolTip ?
                    <ToolTip
                        setshowToolTip={setshowToolTip}
                        id={id}
                        type={type}
                        toolTipCoordinates = {toolTipCoordinates}
                    /> : <></>
            }

        </div>
    )

    function ToolTip({type, id, toolTipCoordinates}) {

        return reactDom.createPortal(
            <div
                style={{ position: "fixed", height: "30vh", width: "15vw", backgroundColor: "turquoise", zIndex: "100", top : `${toolTipCoordinates.y}px` , left : `${toolTipCoordinates.x}px`}}
                onMouseLeave={
                    () => {
                        let hoverTimer = setTimeout(
                            () => { setshowToolTip(false) }
                            , 1500)
                    }
                }
            >
               { renderToolTip(type,id)}
            </div>,
                document.querySelector(".outsideDraggableArea")
            )
    }
}

function renderToolTip(type, id) {
    switch (type) {
        case "ACTION":
            return <ActionList id = {id}/>
      
        case "REACTION":
            return <div> RE ACTION LIST {`${id}`} </div>
      
        case "SUB_COMPONENTS":
            return <div> SUB COMPONENET LIST {`${id}`} </div>
       
        default:
            break;
    }
}

function ActionList({id})
{
   
    return (
        <div> 
            ACTION LIST {`${id}`} 
            <DroppableElement
                    origin = "COMPONENT_TOOLBAR"
                    style = {{
                        width : "100%",
                        marginTop : "8px",
                        marginBottom : "8px",
                        backgroundColor : "wheat"
                    }}
                    droppingElementData = {{
                        dragImage : dragImage,
                        w : 60,
                        h : 20,
                        elementData : {
                            authTool : "COURSEWARE_AUTH_TOOL",
                            componentType : "COURSEBOOK_PAGE_ACTION", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                            data : {
                                type : "coursebook_page_action",
                                name : "Coursebook Page Action name",
                                description : "default Description",
                                belongsTo : "Coursebook Page name"
                            }
                        }
                    }}
                >
                     <div 
                        style = {{padding : "8px" , width : "90%" , backgroundColor : "whitesmoke" }} 
                    >
                        Droppable Action
                    </div>

                </DroppableElement>
                  
           
        </div>
    )
}


// {/* <DroppableElement
// droppingElementData = {{
//    dragImage : dragImage,
//    w : 60,
//    h : 60,
//    elementData : {
//        authTool : "COURSEWARE_AUTH_TOOL",
//        componentType : "COURSEBOOK_PAGE",
//        data : {
//            type : "coursebook_page",
//            name : "Coursebook Page name ",
//            description : "default Description",
//        }
//    }
// }}
// >
// </DroppableElement> */}