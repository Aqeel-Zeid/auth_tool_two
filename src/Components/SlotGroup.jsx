import React , {useEffect, useState} from 'react'

import Slot from './Slot'

export default function SlotGroup({ groupIdentifier, id, direction, label, numberOfSlots }) {

    const [slotGroup, setSlotGroup] = useState([])
    const [renderSlotGroup, setRenderSlotGroup] = useState([])
    
    const [triggerRender, setTriggerRender] = useState(false);


    useEffect(() => {
        
    }, [triggerRender])

    useEffect(() => {
        for (let index = 0; index < numberOfSlots; index++) {
        
            let slot = <Slot
                id={id}
                slotIdentifier={`${groupIdentifier}_${index}`}
                label={label}
                key = {index}
            />
    
            let tempArray = slotGroup
            slotGroup[index] = slot

            setSlotGroup(tempArray)
            
        }
        
    }, [])
    

    useEffect(() => {
        setTriggerRender(!triggerRender);
    }, [slotGroup.length])


    return (
        <div
            style = {{ display : 'flex' , flexDirection : direction , justifyContent : "center" , width : "100%"}}
        >
            {
                slotGroup
            }
        </div>
    )
}
