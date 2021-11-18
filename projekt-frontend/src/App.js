
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListPersonComponent from "./components/ListPersonComponent";
import HeaderComponent from "./components/HeaderComponent";
import UpdatePersonComponent from "./components/UpdatePersonComponent";
import CreatePersonComponent from "./components/CreatePersonComponent";
import ListCompanyComponent from "./components/ListCompanyComponent";
import CreateCompanyComponent from "./components/CreateCompanyComponent";
import UpdateCompanyComponent from "./components/UpdateCompanyComponent";
import ViewPersonComponent from "./components/ViewPersonComponent";
import ViewCompanyComponent from "./components/ViewCompanyComponent";

function App() {
  return (
      <div>
          <Router>
                <HeaderComponent />
                    <div className="container">
                        <Switch>
                            <Route path = "/" exact component = {ListPersonComponent}></Route>
                            <Route path = "/persons" component = {ListPersonComponent}></Route>
                            <Route path = "/add-person" component = {CreatePersonComponent}></Route>
                            <Route path = "/update-person/:id" component = {UpdatePersonComponent}></Route>
                            <Route path = "/view-person/:id" component = {ViewPersonComponent}></Route>
                            <Route path = "/company" component = {ListCompanyComponent}></Route>
                            <Route path = "/add-company" component = {CreateCompanyComponent}></Route>
                            <Route path = "/update-company/:companyName" component = {UpdateCompanyComponent}></Route>
                            <Route path = "/view-company/:companyName" component = {ViewCompanyComponent}></Route>
                        </Switch>
                    </div>
                {/*<FooterComponent />*/}
          </Router>
      </div>

  );
}

export default App;
