import React from 'react'
import FixedSlot from '../CoursewarePageComponent/FixedSlot'

export default function CoursewarePageAction({id, elementData}) {
 
    console.log("🚀 ~ file: coursewarePageAction.jsx ~ line 4 ~ CoursewarePageAction ~ elementData", elementData)
    
    return (
        <div style = {{display : "flex" , justifyContent : "space-between", backgroundColor : "coral", height : "100%" , width : "100%"}}>
          
            <div style = {{padding : "8px" }}>
                <FixedSlot id = {elementData.data.name} slotIdentifier = {`ACTION`} type = "ACTION" colour = "LIGHT_BLUE" setshowToolTip = { () => {}} setToolTipCoordinates = {() => {}}/>
            </div>
            <div>
                    {`${elementData.data.name}`}
            </div>
            <div style = {{padding : "8px"}}>
                <FixedSlot id = {elementData.data.name} slotIdentifier = {`REACTION`} type = "REACTION" colour = "HOT_PINK" setshowToolTip = { () => {}} setToolTipCoordinates = {() => {}} />
            </div>
        </div>
    )
}
