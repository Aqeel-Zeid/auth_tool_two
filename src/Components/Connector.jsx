import React from 'react'
import Xarrow from  'react-xarrows'


export default function Connector({start, end}) {
    return (
        <div>
            <Xarrow
                start={start}
                end={end}
                animateDrawing={0.5}
                key={`${start}-${end}`}
                path="smooth"
                showHead={false}
                label={<h4>{start} -- {end}</h4>}
            />
        </div>
    )
}
