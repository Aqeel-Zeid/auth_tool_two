import React from 'react'
import FixedSlot from './FixedSlot'

export default function SlotsWithToolTips({type, colour, id, gridclassName }) {
    return (
        <div  className = {gridclassName}>
            <FixedSlot type = {type} colour = {colour} id = {id} slotIdentifier = {`${type}`} label = {type.toLowerCase()}/>
        </div>
    )
}
