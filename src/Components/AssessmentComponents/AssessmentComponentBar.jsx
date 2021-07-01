import React from 'react'
import DroppableElement from '../DroppableElement'
import dragImage from "../../dragImage.png"

export default function AssessmentComponentBar() {
    return (
        <div
            style = {{
                padding : "8px",
                paddingLeft : "16px",
                paddingRight : "16px",
                position : "fixed",
                left : "45%",
                boxSizing : "border-box",
                bottom : "10vh",
                backgroundColor : "cornsilk",
                zIndex : 300,
                display : "flex"
            }}
        >
             <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "ASSESSMENT_COMPONENT_TOOL_BAR",
                        w : 40,
                        h : 40,
                        elementData : {
                            authTool : "ASSESSMENT_AUTH_TOOL",
                            componentType : "STEP",
                            data : {
                                type : "STEP",
                                name : "default STEP name",
                                description : "default Description",
                                dependencies : [],
                            }
                        }
                    }
                }
            >
                <div
                    style = {{ padding : "8px" , backgroundColor : "cornflowerblue" , margin : "8px"} }
                >
                    STEP
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "ASSESSMENT_COMPONENT_TOOL_BAR",
                        w : 40,
                        h : 40,
                        elementData : {
                            authTool : "ASSESSMENT_AUTH_TOOL",
                            componentType : "RESPONSE",
                            data : {
                                type : "RESPONSE",
                                name : "default response name",
                                isCorrect : true,
                                description : "default Description",
                                dependencies : [],
                            }
                        }
                    }
                }
            >
                <div
                    style = {{ padding : "8px" , backgroundColor : "cornflowerblue" , margin : "8px"} }
                >
                    RESPONSE
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "ASSESSMENT_COMPONENT_TOOL_BAR",
                        w : 40,
                        h : 40,
                        elementData : {
                            authTool : "ASSESSMENT_AUTH_TOOL",
                            componentType : "MESSAGE",
                            data : {
                                type : "message",
                                name : "default message name",
                                description : "default Description",
                                dependencies : [],
                                actions : [
                                    {
                                        type : "CLICK",
                                        value : "Button A"
                                    },
                                    {
                                        type : "CLICK",
                                        value : "Button B"
                                    }
                                ]
                            }
                        }
                    }
                }
            >
                <div
                    style = {{ padding : "8px" , backgroundColor : "cornflowerblue" , margin : "8px"} }
                >
                    MESSAGE
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "ASSESSMENT_COMPONENT_TOOL_BAR",
                        w : 40,
                        h : 40,
                        elementData : {
                            authTool : "ASSESSMENT_AUTH_TOOL",
                            componentType : "TIMER",
                            data : {
                                type : "timer",
                                value : "1 min 30 sec", 
                                dependencies : []
                            }
                        }
                    }
                }
            >
                <div
                    style = {{ padding : "8px" , backgroundColor : "cornflowerblue" , margin : "8px"} }
                >
                    TIMER
                </div>
            </DroppableElement>
        </div>
    )
}
