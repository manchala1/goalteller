import "./App.css";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mutualfund from "../src/components/Mutualmain";
// import Details from "../src/components/Details";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route exact path="/">
          <Mutualfund />
        </Route>
        {/* <Route exact path="/details">
          <Details />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
