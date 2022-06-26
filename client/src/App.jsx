import './App.css';
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

                <Route exact path="/messageboard">
                    <Dashboard />
                </Route>

            </Switch>

        </div>
    );
}

export default App;


