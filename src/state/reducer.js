
export default function Reducer(state, action) {
    console.log("RAN Reducer",action)
    //console.log(action);

    switch (action.type) {
        case "TEST_ACTION":
            console.log("TEST ACTION", action.payload, state)
            return state
        case "ADD_NON_ROOT_CONTAINER":
            console.log(action)
            return { ...state, nonRootContainers: { ...state.nonRootContainers, [action.payload.id]: action.payload } }
        case "ADJUST_NON_ROOT_CONTAINER_LOCATION":
            console.log(action)
            return {
                ...state, 
                nonRootContainers: {
                    ...state.nonRootContainers,
                    [action.payload.id]:
                    {
                        ...state.nonRootContainers[action.payload.id],
                        lastX: action.payload.x,
                        lastY: action.payload.y,
                    }
                }
            }
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
                            h : action.payload.h
                        }
                    }
                }
        case "SET_ACTIVE_CONTAINER":
                return {
                    ...state,
                    activeContainer : action.payload
                }
        default:
            return state;
    }
};
