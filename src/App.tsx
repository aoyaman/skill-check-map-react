
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Blog from "./Components/Blog/Blog";
import Home from "./Components/Pages/Home/index";
import SkillMap from "./Components/Pages/SkillMap/index";
import Dashboard from "./Components/Pages/Dashboard/index";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/blog">
          <Blog />
        </Route>

        <Route path="/skillmap">
          <SkillMap />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
