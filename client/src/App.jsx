import './App.css';
import App_form from './components/App_form';
import Food from './views/Food'
import Housing from './views/Housing'
import Other from './views/Other'
import { Switch, Route } from 'react-router-dom';
import Signupform from './views/Signupform'
import LoginForm from './views/LoginForm'
import Dashboard from './views/Dashboard'


function App() {
    return (
        <div className='App'>
            <Switch>

                <Route exact path="/signinform">
                    <Signupform />
                </Route>

                <Route exact path="/loginform">
                    <LoginForm />
                </Route>

                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/App_form">
                    <App_form />
                </Route>

                <Route exact path="/food">
                    <Food />
                </Route>

                <Route exact path="/housing">
                    <Housing />
                </Route>

                <Route exact path="/other">
                    <Other />
                </Route>

            </Switch>

        </div>
    );
}

export default App;


