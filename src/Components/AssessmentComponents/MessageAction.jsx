import React from 'react'
import Slot from '../Slot'

export default function MessageAction({id, elementData}) {
    return (
        <div style = {{display : "flex" , flexDirection : "column" , justifyContent : "center"}}>
            <div  style = {{display : "flex" , flexDirection : "row" , justifyContent : "center"}}>
                    <Slot
                        id = {id}
                        slotIdentifier = {"ACTION"}
                        colour = {"LIGHT_BLUE"}
                        gridclassName = "top"
                    />
            </div>
            <div style = {{flexGrow:4 , display : "flex" , flexDirection : "row" , justifyContent : "center" , padding : "16px"}} id = {id}>
                    {
                        elementData.data.name
                    }
            </div>
            <div style = {{display : "flex" , flexDirection : "row" , justifyContent : "center"}}>
                    <Slot
                        id = {id}
                        slotIdentifier = {"REACTION"}
                        colour = {"HOT_PINK"}
                        gridclassName = "top"
                    />
            </div>
        </div>
    )
}
