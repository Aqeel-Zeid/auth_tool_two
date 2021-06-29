import React from 'react'

import Slot from '../Slot'

export default function SkillComponent({id}) {
    return (
        <div>
            Skill Component {id}
            <br/>
            <Slot id = {id} label = "DEPENDS_ON" slotIdentifier = {"TOP_1"}/>
           
        </div>
    )
}
