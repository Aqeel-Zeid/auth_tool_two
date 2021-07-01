import React, { useState } from 'react'
import DroppableElement from './DroppableElement'
import dragImage from '../dragImage.png'

import { Context } from '../state/store'
import { useContext } from 'react'
import { useEffect } from 'react'

export default function ComponentBrowser() {

    const [state, dispatch] = useContext(Context);


    useEffect(() => {
        console.log(state.data)

        let tempArray = [];
        state.data.map(
            component => {
                tempArray.push(
                    <DraggableCoursewareComponent
                        key = {component.name}
                        elementData={
                            {
                                authTool: "COURSEWARE_AUTH_TOOL",
                                componentType: "COURSEBOOK_PAGE", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                                data: {
                                    type: "coursebook_page",
                                    name: component.name,
                                    thumbnail : component.thumbnail,
                                    subComponents : component.subComponents
                                }
                            }}
                    />
                )
            }
        )

        setRenderComponents(tempArray)

    }, [state.data])

    const [renderComponents, setRenderComponents] = useState([])

    useEffect(() => {

    }, [renderComponents.length])

    return (
        <div
            style={{
                padding: "8px",
                backgroundColor: "whitesmoke",
                position: "fixed",
                left: "5vw",
                bottom: "5vh",
                minWidth: "fit-content",
                maxWidth: "20vw",
                height: "40vh",
                zIndex: 300,
            }}
        >
            Component Browser
            {
                renderComponents
            }
        </div>
    )
}



function DraggableCoursewareComponent({ elementData }) {
    
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
                h: 60,
                elementData: elementData
            }}
        >
            <div style={{ paddingTop: "16px", paddingBottom: "16px", backgroundColor: "thistle" }}>
               {elementData.data.name}
            </div>

        </DroppableElement>

    )
}
