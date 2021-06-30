function appendChildToTreePosition(path, object, newObject) {
  let compoundReference = object;

  for (let i = 0; i < path.length - 1; i++) {
    if (i === 0) {
      compoundReference = compoundReference[`${path[i]}`];
    } else {
      compoundReference = compoundReference.children[`${path[i]}`];
    }
  }

  //console.log(compoundReference.children)

  let newChildren = {
    ...compoundReference.chldren,
    [path[path.length - 1]]: newObject,
  };

  console.log(newChildren);

  compoundReference.children[path[path.length - 1]] = newObject;
}

function updateTree(treeObject, pathArray, property, newValue) {
  let compoundReference = treeObject;

  let pathWithoutRoot = pathArray.slice(1);

  //console.log(pathWithoutRoot)

  for (let i = 0; i < pathWithoutRoot.length; i++) {
    if (i === 0) {
      // console.log(compoundReference[`${pathWithoutRoot[i]}`])
      compoundReference = compoundReference[`${pathWithoutRoot[i]}`];
    } else {
      compoundReference = compoundReference.children[`${pathWithoutRoot[i]}`];
    }
  }

  //console.log(compoundReference)
  compoundReference[`${property}`] = newValue;
}

export default function Reducer(state, action) {
  //console.log("RAN Reducer", action)
  //console.log(action);

  switch (action.type) {
    case "TEST_ACTION":
      //console.log("TEST ACTION", action.payload, state)
      return state;
    case "ADD_NON_ROOT_CONTAINER_INTO_ROOT_CONTAINER":
      //console.log(action)
      return {
        ...state,
        nonRootContainers: {
          ...state.nonRootContainers,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_NON_ROOT_CONTAINER_INTO_NON_ROOT_CONTAINER":
      let copy_of_state_3 = { ...state.nonRootContainers };
      let path_3 = action.payload.parent;

      let pathWithoutRoot = [...path_3];

      pathWithoutRoot.shift();

      appendChildToTreePosition(
        pathWithoutRoot,
        copy_of_state_3,
        action.payload
      );

      console.log(path_3, copy_of_state_3, action.payload);

      return { ...state, nonRootContainers: copy_of_state_3 };
    case "ADJUST_NON_ROOT_CONTAINER_LOCATION":
      //console.log(action)
      let copy_of_state = { ...state.nonRootContainers };
      let path = action.payload.path;
      updateTree(copy_of_state, path, "lastX", Math.ceil(action.payload.x));
      updateTree(copy_of_state, path, "lastY", Math.ceil(action.payload.y));

//      console.log(copy_of_state);

      return { ...state, nonRootContainers: copy_of_state };

    case "ADJUST_NON_ROOT_CONTAINER_DIMENTION":
      let copy_of_state_2 = { ...state.nonRootContainers };
      let path_2 = action.payload.path;
      updateTree(copy_of_state_2, path_2, "lastW", Math.ceil(action.payload.w));
      updateTree(copy_of_state_2, path_2, "lastH", Math.ceil(action.payload.h));

      //   console.log(copy_of_state)

      return { ...state, nonRootContainers: copy_of_state_2 };

    case "SET_ACTIVE_CONTAINER":
      return {
        ...state,
        activeContainer: action.payload,
      };
    case "SET_SOURCE_CONNECTOR":
        return {
          ...state,
          sourceConnector : action.payload,
        };
    case "SET_TARGET_CONNECTOR":
          return {
            ...state,
            targetConnector : action.payload,
          };
    case "SET_GRID_SIZE":
      return {
        ...state,
        rootContainer: {
          ...state.rootContainer,
          gridUnit: action.payload.gridUnit,
        },
      };
    case "ADD_CONNECTOR":
      return {
        ...state,
        connections : [
          ...state.connections,
          action.payload
        ]
      };
    case "REMOVE_CONNECTOR":

        console.log(action.payload)
        // Remove Connectors 
        let index = state.connections.findIndex( conn => conn.start === action.payload.start && conn.end === action.payload.end  )
        console.log(index)
        let tempArray = state.connections;
        tempArray.splice(index,1);
        console.log(tempArray)
        // Remove Dependency Array
        return {
          ...state,
        };
    case "REMOVE_NODE":
          console.log(action.payload);
          //Remove Connections 
          let tempConnectionArray = state.connections;

          for (let index = 0; index < tempConnectionArray.length; index++) {
            const element = tempConnectionArray[index];
            //Get the start and End Node Ids
            let sourceId = element.end.split("-")[2];
            let targetID = element.start.split("-")[2]
            if(sourceId === action.payload || targetID === action.payload )
            {
                console.log(element)
                tempConnectionArray.splice(index,1)
            }
          }
          //Remove From All Dependencies
          let tempNodeArray = state.nonRootContainers;

          for (const item in tempNodeArray) {
            //console.log(tempNodeArray[item])
            let dependencyArray = tempNodeArray[item].elementData.data.dependencies

            console.log("🚀 ~ file: reducer.js ~ line 165 ~ Reducer ~ dependencyArray", dependencyArray)
            for (let index = 0; index < dependencyArray.length; index++) {
              const element = dependencyArray[index];
              if(element === state.nonRootContainers[action.payload].elementData.data.name)
              {
                dependencyArray.splice(index,1)
              }
            }

          }

          console.log(tempNodeArray)

          // Remove From NonRootContainers

          delete tempNodeArray[action.payload]


          return {
            ...state,
            nonRootContainers : tempNodeArray,
            connections : tempConnectionArray
          };
      
    case "UPDATE_ELEMENT_DATA":
      return {
        ...state,
        nonRootContainers : {
          ...state.nonRootContainers,
          [action.payload.id] : {
            ...state.nonRootContainers[action.payload.id],
            elementData : {
              ...state.nonRootContainers[action.payload.id].elementData,
              data : {
                ...state.nonRootContainers[action.payload.id].elementData.data,
                ...action.payload.data
              }
            }
          }
        }
      };
    case "REGISTER_DEPENDENCY":
      console.log(action.payload.source.split("-")[2])
    let sourceId = action.payload.source.split("-")[2];
    let targetID = action.payload.target.split("-")[2]
    console.log(state.nonRootContainers[targetID].elementData.data.dependencies)
    // return state;
    return {
          ...state,
          nonRootContainers : {
            ...state.nonRootContainers, 
            [sourceId] : {
              ...state.nonRootContainers[sourceId],
              elementData :{
                ...state.nonRootContainers[sourceId].elementData,
                data : {
                  ...state.nonRootContainers[sourceId].elementData.data,
                  dependencies : [
                ...state.nonRootContainers[sourceId].elementData.data.dependencies,
                state.nonRootContainers[targetID].elementData.data.name
              ]
                }
              }
              
            }
          }
        };
    default:
      return state;
  }
}
