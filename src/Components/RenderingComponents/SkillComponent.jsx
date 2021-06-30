import React from 'react'

import Slot from '../Slot'
import SlotGroup from '../SlotGroup'

export default function SkillComponent({id}) {
    return (
        <div >
            <div style = {{zIndex : 100}}>
                <div  style = {{position : "relative", top : 0 , left : 0 , right : 0 , width : "100%"}}>
                    <SlotGroup groupIdentifier = "TOP"  id = {id} direction = "row" label = "DEPENDS_ON" numberOfSlots = {4} />
                </div>
                <div  style = {{position : "absolute", top : 0 , left : 0 , bottom : 0, height : "100%"}}>
                    <SlotGroup groupIdentifier = "LEFT"  id = {id} direction = "column" label = "DEPENDS_ON" numberOfSlots = {4} />
                </div>
                <div style = {{backgroundColor : "teal" , padding : "8px" , height : "100%" , margin : "8px"}}>
                    Skill Component {id}
                <br/>    
            </div>
                <div  style = {{position : "absolute", right : 0 , top : 0 , bottom : 0 , height : "100%"}}>
                    <SlotGroup groupIdentifier = "RIGHT"  id = {id} direction = "column" label = "DEPENDS_ON" numberOfSlots = {4} />
                </div>
                <div  style = {{position : "relative", bottom : 0 , left : 0 , right : 0 , width : "100%"}}>
                    <SlotGroup groupIdentifier = "BOTTOM"  id = {id} direction = "row" label = "DEPENDS_ON" numberOfSlots = {4} />
                </div>
            </div>
           
            
          
        </div>
    )
}
