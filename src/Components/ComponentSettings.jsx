import React, { useEffect, useState, useContext } from 'react'
import { Context } from "../state/store"


export default function ComponentSettings() {

    const [state, dispatch] = useContext(Context);

    const [currentTab, setCurrentTab] = useState("GENERAL")



    return (

        <div style={{ padding: "8px", width: "100%" }}>
            <h3> Component Settings </h3>
            {
                (state.activeContainer !== state.rootContainer.containerName) ?
                    <>  <div style={{ display: "flex", backgroundColor: "antiquewhite", justifyContent: "center" }}>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px" }}
                            onClick={() => setCurrentTab("GENERAL")}
                        >
                            General Settings
                        </div>
                        <div
                            style={{ marginLeft: "8px", marginRight: "8px" }}
                            onClick={() => setCurrentTab("SKILL")}
                        >
                            Skill Settings
                        </div>
                    </div>
                        {
                            (currentTab === "SKILL") ?
                                <SkillSettings/> :
                                <ComponentValueSettings />
                        }        
                    </> :
                    <>Please Select A Component to Edit</>
            }



        </div>
    )
}


function SkillSettings() {

    const [state, dispatch] = useContext(Context);

    let elementData = {}
    try {
        elementData =   state.nonRootContainers[state.activeContainer].elementData
    } catch (error) {
        console.log(error)
    }

  

    return (
        <>
            Skill Settings
            {
                
            }
        </>
    )
}

function ComponentValueSettings() { // This is General Settings

    const [state, dispatch] = useContext(Context);

    let elementData = {}
    try {
        elementData =   state.nonRootContainers[state.activeContainer].elementData // This is how you have accerss to element data
    } catch (error) {
        console.log(error)
    }


    return (
        <>
          General Settings
            <br />
            {
                
            }
        </>
    )
}





