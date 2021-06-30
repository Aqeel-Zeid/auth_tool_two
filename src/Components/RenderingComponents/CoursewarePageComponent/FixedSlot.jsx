import React, {useContext} from 'react'
import {Context} from "../../../state/store"




export default function FixedSlot({id, slotIdentifier , label , type , colour}) {


    const [state, dispatch] = useContext(Context);

    let backgroundColour = "white"

    switch (colour) {
      case "LIGHT_BLUE":
        backgroundColour = "lightblue"
        break;
      case "DEEP_BLUE":
        backgroundColour = "royalblue"
        break;
      case "HOT_PINK":
        backgroundColour = "pink"
        break;
      default:
        break;
    }

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

                // dispatch({ type: "REGISTER_DEPENDENCY", payload: {
                //   source : state.sourceConnector,
                //   target : e.target.id
                // } })
                
                dispatch({ type: "SET_SOURCE_CONNECTOR", payload: "NON_SELECTED" })
                dispatch({ type: "SET_TARGET_CONNECTOR", payload: "NON_SELECTED" })

              }
              e.stopPropagation()
            }
        }
        style = {
          {
            padding : "8px",
            marginTop : "8px",
            width : "16px",
            height : "16px",
            backgroundColor : backgroundColour }}>
          C
      </div>
    )
}
