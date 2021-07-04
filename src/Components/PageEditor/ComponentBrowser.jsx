import React, { useState, useEffect } from 'react'
import DroppableElement from '../DroppableElement'

import dragImage from "../../dragImage.png"
import frame from "../../frame.svg"

export default function ComponentBrowser() {

    const [selectedBasicCategory, setSelectedBasicCategory] = useState("TEXT")
    const [selectedSelectionCategory, setSelectedSectionCategory] = useState("ARTICLE")

    useEffect(() => {

    }, [selectedBasicCategory, selectedSelectionCategory])

    return (
        <div style={{ height: "100%" }}>
            <h3>Component Setings</h3>
            <div
                style={{
                    padding: "0.5em",
                    backgroundColor: "antiquewhite",
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    flexDirection: "column"
                }}
            >
                <div style={{ backgroundColor: "whitesmoke", height: "40%" }}>
                    Basic Components
                    <div style={{ backgroundColor: "azure", padding: "8px", display: "flex", justifyContent: "center" }}>
                        <div style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedBasicCategory("TEXT")}
                        >
                            Text
                        </div>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedBasicCategory("IMAGE")}
                        >
                            Image
                        </div>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedBasicCategory("ACTION")}
                        >
                            Actions
                        </div>
                    </div>
                    <BasicComponentList category={selectedBasicCategory} />
                </div>
                <div style={{ backgroundColor: "antiquewhite", height: "50%", marginTop: "8px" }}>
                    Section Components
                    <div style={{ backgroundColor: "azure", padding: "8px", display: "flex", justifyContent: "center" }}>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedSectionCategory("LIST")}
                        >
                            Lists
                        </div>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedSectionCategory("ARTICLE")}
                        >
                            Articles
                        </div>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px", padding: "8px", backgroundColor: "chartreuse" }}
                            onClick={() => setSelectedSectionCategory("SEQUENCE")}
                        >
                            Sequences
                        </div>
                    </div>
                    <SectionComponentList category={selectedSelectionCategory} />
                </div>
            </div>
        </div>
    )
}


function BasicComponentList({ category }) {

    const renderList = []

    switch (category) {
        case "TEXT":
            renderList.push(
                <DroppableElement
                    key="Heading1"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "HEADING_1",
                            data: {
                                value: "Default Heading 1",
                                type: "TEXT",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Heading 1 </div>
                </DroppableElement>,
                <DroppableElement
                    key="Heading2"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "HEADING_2",
                            data: {
                                value: "Default Heading 2",
                                type: "TEXT",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Heading 2 </div>
                </DroppableElement>,
                <DroppableElement
                    key="paragraph1"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "PARAGRAPH_1",
                            data: {
                                value: "PARAGRAPH_1",
                                type: "TEXT",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Paragraph 1 </div>
                </DroppableElement>
            )
            break;
        case "IMAGE":
            renderList.push(
                <DroppableElement
                    key="image1"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "SMALL_IMAGE",
                            data: {
                                value: "Small Image",
                                type: "TEXT_URL",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Small Image</div>
                </DroppableElement>,
                <DroppableElement
                    key="image2"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "SQUARE_IMAGE",
                            data: {
                                value: "default image",
                                type: "TEXT_URL",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Square Image </div>
                </DroppableElement>,
            )
            break;
        case "ACTION":
            renderList.push(
                <DroppableElement
                    key="basic Button"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "BASIC_BUTTON",
                            data: {
                                value: "basic Button",
                                type: "TEXT",
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Basic Button  </div>
                </DroppableElement>,
            )
            break;

        default:
            break;
    }

    return (
        <div>
            {
                renderList
            }
        </div>
    )
}


function SectionComponentList({ category }) {
    const renderList = []

    switch (category) {
        case "LIST":
            renderList.push(
                <DroppableElement
                    key="basic_list"
                    origin="SECTION_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "SECTION_COMPONENT",
                            category: category,
                            type: "BASIC_LIST",
                            data: {
                                skills: [],
                                value:
                                {
                                    groups: {
                                        "General": {
                                            "Title": {
                                                value: "Title",
                                                type: "TEXT"
                                            },
                                            "Description": {
                                                value: "Description",
                                                type: "TEXT"
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Basic List </div>
                </DroppableElement>,
                <DroppableElement
                    key="Heading2"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "HEADING_2",
                            data: {
                                skills: [],
                                value: "Default Heading 2"
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Point List </div>
                </DroppableElement>,
                <DroppableElement
                    key="Heading1"
                    origin="BASIC_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "BASIC_COMPONENT",
                            category: category,
                            type: "PARAGRAPH_1",
                            data: {
                                skills: [],
                                value: "PARAGRAPH_1"
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Fancy List </div>
                </DroppableElement>
            )
            break;
        case "ARTICLE":
            renderList.push(
                <DroppableElement
                    key="article_image_paragraph"
                    origin="SECTION_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "SECTION_COMPONENT",
                            category: category,
                            type: "ARTICLE_IMAGE_PARAGRAPH",
                            data: {
                                skills: [],
                                value: "article image paragraph"
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Image And Paragraph</div>
                </DroppableElement>,
                <DroppableElement
                    key="action_article"
                    origin="SECTION_COMPONENT_ACTION_ARTICLE"
                    droppingElementData={{
                        h: 10,
                        w: 10,
                        elementData:
                        {
                            componentType: "SECTION_COMPONENT",
                            category: category,
                            type: "ACTION_ARTICLE",
                            data: {
                                value:
                                {
                                    groups: {
                                        "General": {
                                            "title": {
                                                value: "Default Title",
                                                type: "TEXT", 
                                                label : "Title"
                                            },
                                            "paragraph": {
                                                label : "Description",
                                                value: "Default Description",
                                                type: "TEXT"
                                            },
                                            "action": {
                                                label : "Button Label",
                                                value: "first Action",
                                                type: "TEXT"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Action Article </div>
                </DroppableElement>,
            )
            break;
        case "SEQUENCE":
            renderList.push(
                <DroppableElement
                    key="Heading1"
                    origin="SECTION_COMPONENT_LIST_BAR"
                    droppingElementData={{
                        h: 5,
                        w: 10,
                        elementData:
                        {
                            componentType: "SECTION_COMPONENT",
                            category: category,
                            type: "BASIC_BUTTON",
                            data: {
                                value: "basic Button"
                            }
                        }
                    }}
                >
                    <div style={{ backgroundColor: "coral", padding: "8px", margin: "8px" }}> Basic Button  </div>
                </DroppableElement>,
            )
            break;

        default:
            break;
    }

    return (
        <div>
            {
                renderList
            }
        </div>
    )
}
