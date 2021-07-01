import React from 'react'
import Slot from '../Slot'

import { Context } from "../../state/store"
import { useContext } from 'react'

import "./gridStyles.css"

export default function Timer({elementData,id}) {
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
                        slotIdentifier = {"REACTION"}
                        colour = {"HOT_PINK"}
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

                <TimerComponentNode elementData = {elementData} id = {id}/>
            </div>
        </>
    )
}


function TimerComponentNode({elementData, id}) {
    return (
        <div className = "center" id = {id}>
            Timer Component
            <br />
            {
                `STimer : ${elementData.data.value}`
            }
         
        </div>
    )
}




