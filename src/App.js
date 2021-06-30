import React from "react";
import Store from "./state/store";
import { RootContainer } from "./RootContainer";

function App() {
  return (
    <Store>
        <RootContainer ContainerName="RootContainer" style = {{ zIndex : 10  }} />
    </Store>
  );
}

export default App;


