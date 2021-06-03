import React from 'react'
import Draggable from 'react-draggable'

export function MovableItem()
{
    return(
        <Draggable
            axis="x"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[25, 25]}
            scale={1}
        >
        <div style = {{width:"100px", height: "100px", backgroundColor: "crimson", padding : "10px"}}> 
                Movable Item
        </div>
        </Draggable>
    )
}


export default function AttemptTwo() {
    return (
        <div >
            <MovableItem/>
        </div>
    )
}
