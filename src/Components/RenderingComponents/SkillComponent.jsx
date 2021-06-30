import React, {useState, useContext, useEffect} from 'react'

import Slot from '../Slot'
import SlotGroup from '../SlotGroup'

import {Context} from "../../state/store"

export default function SkillComponent({id}) {
    

    const [state, dispatch] = useContext(Context)

    const [name, setName] = useState(state.nonRootContainers[id].elementData.data.name)
    
    useEffect(() => {
        
    }, [])

    return (
        <div style = {{zIndex : 100}}>
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
                    <label>Name</label>

                    <br/>
                        <button onClick = { () => console.log("Clicked Button")}>Click Me</button>
                    <br/>
                    
                    <input
                        style = {{zIndex : "100", display : "block"}} 
                        type = "text"
                        value = {name}
                        onClick = { (e) => e.target.focus()  }
                        onChange = { e => {
                            setName(e.target.value)
                            dispatch({
                                type : "UPDATE_ELEMENT_DATA",
                                payload : {
                                    id : id,
                                    data : {
                                        name : name
                                    }
                                }
                            })
                        }}
                      />

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
