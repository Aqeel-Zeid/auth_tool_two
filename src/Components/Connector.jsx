import React , {useEffect, useState} from 'react'
import { useContext } from 'react'
import Xarrow from  'react-xarrows'

import {Context} from "../state/store"


export default function Connector({start, end , label}) {

    const [state, dispatch] = useContext(Context);

    const removeConnector = () => {
        dispatch(
            {
                type : "REMOVE_CONNECTOR",
                payload : {
                    start : start,
                    end : end
                }
            }
        )
    }

    return (
        <div>
            <Xarrow
                start={start}
                end={end}
                animateDrawing={0.5}
                key={`${start}-${end}`}
                path="smooth"
                showHead={true}
                label={
                    <div style = {{display : "flex"}}>
                        <label style = {{marginLeft : "8px", marginRight : "8px" }}>{label}</label>
                        <button onClick = { () => removeConnector() }>x</button>
                    </div>
            }
            />
        </div>
    )
}
