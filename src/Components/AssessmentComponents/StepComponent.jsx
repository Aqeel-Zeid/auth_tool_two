import React from 'react'
import Slot from '../Slot'

import { Context } from "../../state/store"
import { useContext } from 'react'

import "./gridStyles.css"

export default function StepComponent({ id, elementData }) {

    const [state, dispatch] = useContext(Context)

    return (
        <>
            <div className="parent" id={id} onClick={
                () => {
                    //console.log(id)
                    dispatch(
                        {
                            type: "SET_ACTIVE_CONTAINER",
                            payload: id

                        }
                    )
                }
            } >
                <div className = "bottom"> 
                    <Slot
                        id = {id}
                        slotIdentifier = {"SUB_SECTION"}
                        colour = {"DEEP_BLUE"}
                        gridclassName = "top"
                    />
                </div>
                <div className = "top"> 
                    <Slot
                        id = {id}
                        slotIdentifier = {"REACTION"}
                        colour = {"HOT_PINK"}
                        gridclassName = "top"
                    />
                </div>

                <StepComponentNode elementData = {elementData} id = {id}/>
            </div>
        </>
    )
}

{/* <CoursewarePageComponentNode style = {{gridArea: "2 / 2 / 3 / 3"}} gridclassName = "center" id = {id}/> */ }




function StepComponentNode({elementData, id}) {
    return (
        <div className = "center" id = {id}>
            Step Component
            <br />
            {
                `Step Name : ${elementData.data.name}`
            }
            <br />
            {
                `Step Description : ${elementData.data.description}`
            }
            <br />
        </div>
    )
}
