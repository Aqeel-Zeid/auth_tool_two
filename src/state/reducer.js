function updateTree(treeObject, pathArray, property, newValue)
{
	let compoundReference = treeObject;

  
    let pathWithoutRoot = pathArray.slice(1)

    //console.log(pathWithoutRoot)

	for(let i = 0 ; i < pathWithoutRoot.length ; i++)
    {
        if(i === 0)
        {
                // console.log(compoundReference[`${pathWithoutRoot[i]}`])
                compoundReference = compoundReference[`${pathWithoutRoot[i]}`]
        }
        else{
            
            compoundReference = compoundReference.children[`${pathWithoutRoot[i]}`]
        }
    }


    //console.log(compoundReference)
	compoundReference[`${property}`] = newValue
	
}

export default function Reducer(state, action) {
    //console.log("RAN Reducer", action)
    //console.log(action);

    switch (action.type) {
        case "TEST_ACTION":
            //console.log("TEST ACTION", action.payload, state)
            return state
        case "ADD_NON_ROOT_CONTAINER":
            //console.log(action)
            return { ...state, nonRootContainers: { ...state.nonRootContainers, [action.payload.id]: action.payload } }
        case "ADJUST_NON_ROOT_CONTAINER_LOCATION":
            
            console.log(action)
            let copy_of_state = {...state.nonRootContainers}
            let path = action.payload.path
            updateTree(copy_of_state, path,"lastX",action.payload.x)
            updateTree(copy_of_state,path,"lastY",action.payload.y)
            
            console.log(copy_of_state)

            return {...state, nonRootContainers : copy_of_state}

        case "ADJUST_NON_ROOT_CONTAINER_DIMENTION":
         
            let copy_of_state_2 = {...state.nonRootContainers}
            let path_2 = action.payload.path
            updateTree(copy_of_state_2, path_2,"lastW",action.payload.w)
            updateTree(copy_of_state_2,path_2,"lastH",action.payload.h)
            
         //   console.log(copy_of_state)

            return {...state, nonRootContainers : copy_of_state_2}
        case "UPDATE_NON_ROOT_CONTAINER_STATE":
            //console.log(action)
            return {
                ...state, nonRootContainers: {
                    ...state.nonRootContainers,
                    [action.payload.id]:
                    {
                        ...state.nonRootContainers[action.payload.id],
                        x: action.payload.x,
                        y: action.payload.y,
                        w: action.payload.w,
                        h: action.payload.h
                    }
                }
            }
        case "SET_ACTIVE_CONTAINER":
            return {
                ...state,
                activeContainer: action.payload
            }
        default:
            return state;
    }
};
