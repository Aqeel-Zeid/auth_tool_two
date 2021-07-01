import React from 'react'

import {Context} from "../../../state/store"

import SlotsWithToolTips from './SlotsWithToolTips'

import styles from "./gridStyles.css"
import { useContext } from 'react'

export default function CoursewarePageComponent({id, elementData}) {

    const [state,dispatch] = useContext(Context);



    return (
        <div className = "parent" id = {id} onClick = {
            () => {
                //console.log(id)
                dispatch(
                    {
                        type : "SET_ACTIVE_CONTAINER",
                        payload : id
                        
                    }
                )
            }
        } >
            <SlotsWithToolTips 
                type = "ACTION" 
                colour = "LIGHT_BLUE" 
                id = {id}  
                style = {{gridArea: "2 / 1 / 3 / 2"}} 
                gridclassName = "right" 
                elementData = {elementData}
            />
            <CoursewarePageComponentNode style = {{gridArea: "2 / 2 / 3 / 3"}} gridclassName = "center" id = {id}/>
            <SlotsWithToolTips 
                type = "REACTION" 
                colour = "HOT_PINK" 
                id = {id} 
                style = {{gridArea: "3 / 2 / 4 / 3"}} 
                gridclassName = "left"
                elementData = {elementData}
            />
            <SlotsWithToolTips 
                type = "SUB_COMPONENTS" 
                colour = "DEEP_BLUE" 
                id = {id} 
                style = {{gridArea: "2 / 3 / 3 / 4"}} 
                gridclassName = "bottom"
                elementData = {elementData}
                subComponents = {elementData.data.subComponents}
                mainComponent = {elementData.data.name}
            />
        </div>
    )
}


function CoursewarePageComponentNode({gridclassName, id}) {
    
    const [state,dispatch] = useContext(Context);


    return (
        <div 
            style = {{backgroundColor : "violet" , height : "100%" , zIndex : "200"}} 
            className = {gridclassName}
            id = {id}
            onClick = {
                () => {
                    //console.log("Button Clicked")
                    dispatch(
                        {
                            type : "SET_ACTIVE_CONTAINER",
                            payload : id
                        }
                    )
                } 
            }
        >
            Courseware Page Compnent Node
        </div>
    )
}

