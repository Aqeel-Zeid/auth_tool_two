import React from 'react'
import DroppableElement from './DroppableElement'
import dragImage from '../dragImage.png'

export default function ComponentToolBar() {
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
                        origin : "COMPONENT_TOOL_BAR",
                        w : 20,
                        h : 20,
                        elementData : {
                            authTool : "SKILL_TREE_AUTH_TOOL",
                            componentType : "SKILL",
                            data : {
                                type : "skill",
                                name : "default skill name",
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
                    SKILL
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "COMPONENT_TOOL_BAR",
                        w : 10,
                        h : 10,
                        elementData : {
                            authTool : "SKILL_TREE_AUTH_TOOL",
                            componentType : "FACT",
                            data : {
                                type : "fact",
                                name : "default fact name",
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
                    FACT
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "COMPONENT_TOOL_BAR",
                        w : 10,
                        h : 10,
                        elementData : {
                            authTool : "SKILL_TREE_AUTH_TOOL",
                            componentType : "CONCEPT",
                            data : {
                                type : "concept",
                                name : "default concept name",
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
                    CONCEPT
                </div>
            </DroppableElement>
            <DroppableElement
                droppingElementData = {
                    {
                        dragImage : dragImage,
                        origin : "COMPONENT_TOOL_BAR",
                        w : 10,
                        h : 10,
                        elementData : {
                            authTool : "SKILL_TREE_AUTH_TOOL",
                            componentType : "GROUP",
                            data : {
                                type : "group",
                                name : "default group name",
                                description : "default group Description",
                                dependencies : [],
                            }
                        }
                    }
                }
            >
                <div
                    style = {{ padding : "8px" , backgroundColor : "cornflowerblue" , margin : "8px"} }
                >
                    GROUP
                </div>
            </DroppableElement>
        </div>
    )
}
