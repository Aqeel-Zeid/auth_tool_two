
const Reducer = (state, action) => {
    //console.log(state,action)
    //console.log(action);
  
    switch (action.type) {
      case "TEST_ACTION" : 
        console.log("TEST ACTION", action.payload, state)
        return state
      default:
        return state;
    }
  };
  