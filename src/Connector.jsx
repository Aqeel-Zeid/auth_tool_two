import React , {useState, useEffect} from 'react'



function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

export default function Connector({start, end , type}) {
    
    let startCoordinate = getOffset( document.querySelector(`#${start}`) );
    let endCoordinate = getOffset( document.querySelector(`#${end}`) );

    

    useEffect(() => {
        
        console.log(document.querySelector(`#${start}`))
        console.log(document.querySelector(`#${end}`))
       
        console.log(startCoordinate, endCoordinate)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        startCoordinate.top,
        startCoordinate.left,
        endCoordinate.top,
        endCoordinate.left
        
    ])
    
    return (
        <div>
            Connector
        </div>
    )
}
