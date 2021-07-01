import React from 'react'
import SlotsWithToolTips from '../CoursewarePageComponent/SlotsWithToolTips'

import {Context} from "../../../state/store"
import { useContext } from 'react'

export default function CoursewareSubPage({id , elementData}) {
    
    const [state, dispatch] = useContext(Context)
    
    return (
        <div className = "parent" id = {id} onClick = {  () => {
            //console.log(id)
            dispatch(
                {
                    type : "SET_ACTIVE_CONTAINER",
                    payload : id
                    
                }
            )
        }} >
            <SlotsWithToolTips type = "ACTION" colour = "LIGHT_BLUE" id = {id}  style = {{gridArea: "2 / 1 / 3 / 2"}} gridclassName = "right" />
            <CoursewareSubPageComponentNode gridclassName = "center" id = {id} elementData = {elementData}/>
            <SlotsWithToolTips type = "REACTION" colour = "HOT_PINK" id = {id} style = {{gridArea: "3 / 2 / 4 / 3"}} gridclassName = "left"/>
            <SlotsWithToolTips type = "SUB_COMPONENTS" colour = "DEEP_BLUE" id = {id} style = {{gridArea: "2 / 3 / 3 / 4"}} gridclassName = "top"/>
        </div>
    )
}

 function CoursewareSubPageComponentNode({gridclassName,elementData}) {
    return (
        <div className = {gridclassName}>
                {JSON.stringify(elementData.data)}
        </div>
    )
}

