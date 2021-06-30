import React, {useContext} from 'react'
import {Context} from "../state/store"




export default function Slot({id, slotIdentifier , label}) {


    const [state, dispatch] = useContext(Context);


    return (
        <div
        id = {`connector-${slotIdentifier}-${id}`} 
        onClick = {
          (e) => {
            if(state.sourceConnector === "NON_SELECTED")
            {
              dispatch({ type: "SET_SOURCE_CONNECTOR", payload: e.target.id })
            }
            else
            {
              dispatch({ type: "SET_TARGET_CONNECTOR", payload: e.target.id })
              dispatch({ type: "ADD_CONNECTOR", payload: {
                start : state.sourceConnector,
                end : e.target.id,
                label : label  
              } })

              dispatch({ type: "REGISTER_DEPENDENCY", payload: {
                source : state.sourceConnector,
                target : e.target.id
              } })
              
              dispatch({ type: "SET_SOURCE_CONNECTOR", payload: "NON_SELECTED" })
              dispatch({ type: "SET_TARGET_CONNECTOR", payload: "NON_SELECTED" })

            }
            e.stopPropagation()
          }
        }
        style = {
          {
            padding : "8px",
            margin : "8px",
            width : "16px",
            height : "16px",
            backgroundColor : (state.sourceConnector === `connector-NW-${id}`) ? "coral" : "cornsilk" }}>
          C
      </div>
    )
}
