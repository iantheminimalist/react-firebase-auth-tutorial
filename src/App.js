import { Container } from "reactstrap";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider }from "./contexts/AuthContext";
import { BrowserRouter as Router , Switch, Route  } from 'react-router-dom'
import UpdateProfile from "./components/UpdateProfile";


function App() {
  return(
 
      <Container 
        className="d-flex align-items-center justify-content-center" 
        style={{minHeight: "100vh"}} >
      <div className="w-100" style={{maxWidth: "600px"}}>
      <Router>
      <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />        
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route patt="/forgot-password" component={ForgotPassword} />

      </Switch>
      </AuthProvider>
      </Router>

      </div>

      </Container>



  )
}

export default App;
