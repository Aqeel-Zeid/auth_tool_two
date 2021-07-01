import React from 'react'
import DroppableElement from './DroppableElement'
import dragImage from '../dragImage.png'

export default function ComponentBrowser() {
    return (
        <div
            style = {{
                padding : "8px",
                backgroundColor : "whitesmoke",
                position : "fixed",
                left : "5vw",
                bottom : "5vh",
                minWidth : "fit-content",
                maxWidth : "20vw",
                height : "40vh",
                zIndex : 300,
            }}
        >
            Component Browser

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
                        h : 60,
                        elementData : {
                            authTool : "COURSEWARE_AUTH_TOOL",
                            componentType : "COURSEBOOK_PAGE", // COURSEBOOK_VIDEO oR COURSEBOOK_ASSESSMENT
                            data : {
                                type : "coursebook_page",
                                name : "Coursebook Page name ",
                                description : "default Description",
                            }
                        }
                    }}
                >
                    <div style = {{paddingTop : "16px", paddingBottom : "16px"  , backgroundColor : "thistle"}}>
                        Page A
                    </div>

                </DroppableElement>
     
            
        </div>
    )
}
