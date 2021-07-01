import React, { useEffect } from 'react'
import { useState, useContext } from 'react'



import dragImage from "../../dragImage.png"
import reactDom from 'react-dom'

import { Context } from "../../state/store"

import DroppableElement from '../DroppableElement'
import FixedSlot from '../RenderingComponents/CoursewarePageComponent/FixedSlot'

export default function ActionSlotWithToolTips({ type, colour, id, gridclassName, elementData }) {

    const [showToolTip, setshowToolTip] = useState(false)

    const [toolTipCoordinates, setToolTipCoordinates] = useState({ x: 150, y: 150 })

    return (
        <div className={gridclassName}>
            <FixedSlot
                type={type}
                colour={colour}
                id={id}
                slotIdentifier={`${type}`}
                label={type.toLowerCase()}
                setshowToolTip={setshowToolTip}
                setToolTipCoordinates={setToolTipCoordinates}
            />
            {
                (showToolTip && (elementData !== null) && (elementData !== undefined)) ?
                    <ToolTip
                        setshowToolTip={setshowToolTip}
                        id={id}
                        type={type}
                        toolTipCoordinates={toolTipCoordinates}
                        elementData={elementData}
                    /> : <></>
            }

        </div>
    )

    function ToolTip({ type, id, toolTipCoordinates, elementData }) {

        return reactDom.createPortal(
            <div
                style={{ position: "fixed", height: "30vh", width: "15vw", backgroundColor: "turquoise", zIndex: "100", top: `${toolTipCoordinates.y}px`, left: `${toolTipCoordinates.x}px` }}
                onMouseLeave={
                    () => {
                        let hoverTimer = setTimeout(
                            () => { setshowToolTip(false) }
                            , 10)
                    }
                }
            >
               <ActionList id={id} elementData={elementData} />
            </div>,
            document.querySelector(".outsideDraggableArea")
        )
    }
}


function ActionList({ id, elementData }) {

    console.log(elementData.data.actions)

    const [renderComponents, setRenderComponents] = useState([])

    try {
        useEffect(() => {

            let tempArray = [];
            if (elementData.data.actions !== null && elementData.data.actions !== undefined) {
    
                elementData.data.actions.map(
                    actions => {
                        console.log(actions)
                        tempArray.push(
                            <DroppableElement
                                key = {`${actions.type}-${actions.value}`}
                                origin="COMPONENT_TOOLBAR"
                                style={{
                                    width: "100%",
                                    marginTop: "8px",
                                    marginBottom: "8px",
                                    backgroundColor: "wheat"
                                }}
                                droppingElementData={{
                                    dragImage: dragImage,
                                    w: 60,
                                    h: 20,
                                    elementData: {
                                        authTool: "ASSESMENT_AUTH_TOOL",
                                        componentType: "MESSAGE_ACTION", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                                        data: {
                                            type: "MESSAGE_ACTION",
                                            name: `${actions.type} ${actions.value}`,
                                            belongsTo: elementData.data.name,
                                            type : actions.type,
                                            value : actions.value,
                                            dependencies : []
                                        }
                                    }
                                }}
                            >
                                <div
                                    style={{ padding: "8px", width: "90%", backgroundColor: "whitesmoke" }}
                                >
                                    {`${actions.type} ${actions.value}`}
                                </div>
    
                            </DroppableElement>
                        )
                    }
                )
    
                setRenderComponents(tempArray)
    
            }
    
            
    
        }, [elementData.data.actions.length])
    
    } catch (error) {
        console.log(error)
    }

   
    return (
        <div>
            ACTION LIST {`${id}`}
           
            {
                renderComponents
            }

        </div>
    )
}

