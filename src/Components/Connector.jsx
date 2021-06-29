import React from 'react'
import Xarrow from  'react-xarrows'


export default function Connector({start, end , label}) {
    return (
        <div>
            <Xarrow
                start={start}
                end={end}
                animateDrawing={0.5}
                key={`${start}-${end}`}
                path="smooth"
                showHead={true}
                label={<h4>{label}</h4>}
            />
        </div>
    )
}
