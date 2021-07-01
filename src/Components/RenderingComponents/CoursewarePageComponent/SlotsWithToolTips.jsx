import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import DroppableElement from '../../DroppableElement'
import FixedSlot from './FixedSlot'

import dragImage from "../../../dragImage.png"
import reactDom from 'react-dom'

import { Context } from "../../../state/store"

export default function SlotsWithToolTips({ type, colour, id, gridclassName, elementData }) {

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
                            , 1500)
                    }
                }
            >
                {renderToolTip(type, id, elementData)}
            </div>,
            document.querySelector(".outsideDraggableArea")
        )
    }
}

function renderToolTip(type, id, elementData) {
    switch (type) {
        case "ACTION":
            return <ActionList id={id} elementData={elementData} />

        case "REACTION":
            return <></>

        case "SUB_COMPONENTS":
            return <SubComponentList id={id} elementData={elementData} />

        default:
            break;
    }
}

function ActionList({ id, elementData }) {

    console.log(elementData.data)

    const [renderComponents, setRenderComponents] = useState([])

    try {
        useEffect(() => {

            let tempArray = [];
            if (elementData.data.elementData.actions !== null && elementData.data.elementData.actions !== undefined) {
    
                elementData.data.elementData.actions.map(
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
                                        authTool: "COURSEWARE_AUTH_TOOL",
                                        componentType: "COURSEBOOK_PAGE_ACTION", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                                        data: {
                                            type: "COURSEBOOK_PAGE_ACTION",
                                            name: `${actions.type} to ${actions.value}`,
                                            belongsTo: elementData.data.name
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
    
            
    
        }, [elementData.data.elementData.actions.length])
    
    } catch (error) {
        console.log(error)
    }

   
    return (
        <div>
            ACTION LIST {`${id}`}
            <DroppableElement
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
                        authTool: "COURSEWARE_AUTH_TOOL",
                        componentType: "COURSEBOOK_PAGE_ACTION", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                        data: {
                            type: "COURSEBOOK_PAGE_ACTION",
                            name: "Coursebook COURSEBOOK_PAGE_ACTION name",
                            description: "default Description",
                            belongsTo: "Coursebook Page name"
                        }
                    }
                }}
            >
                <div
                    style={{ padding: "8px", width: "90%", backgroundColor: "whitesmoke" }}
                >
                    Droppable Action
                </div>

            </DroppableElement>
            {
                renderComponents
            }

        </div>
    )
}


function SubComponentList({ id, elementData }) {

    const [renderingList, setRenderingList] = useState([])

    useEffect(() => {

        let tempArray = []
        console.log(elementData.data.subComponents)

        for (const sub in elementData.data.subComponents) {
            tempArray.push(
                <SubComponentListItem
                    key={sub}
                    name={sub}
                    belongsToMain={elementData.data.name}
                    elementData={
                        elementData.data.subComponents[sub]
                    }
                />
            )
        }

        setRenderingList(tempArray)

    }, [elementData.data.subComponents.length])



    return (
        <div>
            SUB COMPONENT LIST {`${id}`}
            {
                renderingList
            }
        </div>
    )
}


function SubComponentListItem({ name, belongsToMain, elementData }) {

    return (
        <DroppableElement
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
                    authTool: "COURSEWARE_AUTH_TOOL",
                    componentType: "COURSEBOOK_PAGE_SUB_PAGE", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                    data: {
                        type: "COURSEBOOK_PAGE_SUB_PAGE",
                        name: name,
                        belongsToMain: belongsToMain,
                        elementData: elementData
                    }
                }
            }}
        >
            <div
                style={{ padding: "8px", width: "90%", backgroundColor: "whitesmoke" }}
            >
                {name}
            </div>

        </DroppableElement>
    )



}