import React, {useContext} from 'react'
import {Context} from "../state/store"




export default function Slot({id}) {


    const [state, dispatch] = useContext(Context);


    return (
        <div
        id = {`connector-NW-${id}`} 
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
                end : e.target.id
              } })
              dispatch({ type: "SET_SOURCE_CONNECTOR", payload: "NON_SELECTED" })
              dispatch({ type: "SET_TARGET_CONNECTOR", payload: "NON_SELECTED" })
              
            }
            e.stopPropagation()
          }
        }
        style = {
          {
            padding:"0.5em", 
            position:"absolute", 
            top : "45%" , 
            right : "1em" , 
            backgroundColor : (state.sourceConnector === `connector-NW-${id}`) ? "coral" : "cornsilk" }}>
          C
      </div>
    )
}
