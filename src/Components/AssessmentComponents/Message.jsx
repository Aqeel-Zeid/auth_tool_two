import React from 'react'
import Slot from '../Slot'

import { Context } from "../../state/store"
import { useContext } from 'react'

import "./gridStyles.css"
import ActionSlotWithToolTips from './ActionSlotWithToolTips'




export default function Message({id,elementData}) {

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
                   <ActionSlotWithToolTips
                          id = {id}
                          slotIdentifier = {"REACTION"}
                          colour = {"LIGHT_BLUE"}
                          type = {"ACTION"}
                          elementData = {elementData}
                   />
               </div>
               <div className = "top"> 
                   <Slot
                       id = {id}
                       slotIdentifier = {"REACTION"}
                       colour = {"HOT_PINK"}
                       
                   />
               </div>

               <MessageComponentNode elementData = {elementData} id = {id}/>
           </div>
       </>
   )
}


function MessageComponentNode({elementData,id}) {
    return (
        <div className = "center" id = {id}>
            Message Component
                <br />
                {
                    `Message Name : ${elementData.data.name}`
                }
                <br />
                {
                    `Message Description : ${elementData.data.description}`
                }
                <br />
        </div>
    )
}


