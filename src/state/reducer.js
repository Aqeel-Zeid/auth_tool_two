
export default function Reducer(state, action) {
    //console.log(state,action)
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
                ...state, nonRootContainers: {
                    ...state.nonRootContainers,
                    [action.payload.id]:
                    {
                        ...state.nonRootContainers[action.payload.id],
                        x: action.payload.x,
                        y: action.payload.y
                    }
                }
            }
        default:
            return state;
    }
};
