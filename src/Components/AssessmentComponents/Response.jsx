import React from 'react'
import Slot from '../Slot'

import { Context } from "../../state/store"
import { useContext } from 'react'

import "./gridStyles.css"


export default function Response({elementData,id}) {

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
                <div className = "top"> 
                    <Slot
                        id = {id}
                        slotIdentifier = {"SUB_SECTION"}
                        colour = {"DEEP_BLUE"}
                        gridclassName = "top"
                    />
                </div>
                <div className = "bottom"> 
                    <Slot
                        id = {id}
                        slotIdentifier = {"REACTION"}
                        colour = {"HOT_PINK"}
                        gridclassName = "top"
                    />
                </div>

                <ResponseComponentNode elementData = {elementData} id = {id}/>
            </div>
        </>
    )
}


function ResponseComponentNode({elementData,id}) {
    return (
        <div className = "center" id = {id}>
            Response Component
                <br />
                {
                    `Step Name : ${elementData.data.name}`
                }
                <br />
                {
                    `Step is Correct : ${elementData.data.isCorrect}`
                }
                <br />
        </div>
    )
}
