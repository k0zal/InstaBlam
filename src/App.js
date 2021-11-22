import React from "react";
import "./styles/App.css";
import { Switch, Route,} from "react-router-dom";
import Album from "./components/Album";
import Camera from "./components/Camera";

function App() {
  

  return (
    <Switch>
      <Route exact path="/">
        <Camera />
        
      </Route>

      <Route exact path="/album">
        <Album />
      </Route>
    </Switch>
  );
}

export default App;
