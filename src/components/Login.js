
import React, { useRef, useState } from 'react'
import { CardBody, Card, Form, FormGroup, Button, Label } from 'reactstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();
    
   async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('')
            setLoading(true)
            await login( emailRef.current.value, passwordRef.current.value )
            history.push('/') 
        }catch{
            setError("Failed to log in.")
        }
        setLoading(false)
    }

    return (
      <>
      <Card>
          <CardBody>
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger" color="danger"> Wrong Password </div>}
              <Form onSubmit={handleSubmit}>
                     <FormGroup id="email">
                    <Label>Email</Label>
                    <input 
                      className="form-control"
                      placeholder="Email" 
                      type="email"
                      ref={emailRef}
                      required />
                  </FormGroup>
                  <FormGroup id="password">
                  <Label>Password</Label>
                    <input 
                      className="form-control"
                      placeholder="Password" 
                      type="password"
                      ref={passwordRef}
                      required />
                  </FormGroup>
                  <Button 
                    className="w-100" 
                    color="primary" 
                    type="submit" 
                    disabled={loading}>Login</Button>
              </Form>
              <div className=" w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
          </CardBody>
      </Card>
      <div className=" w-100 text-center mt-2">
        Don't have an account? <Link to="/SignUp">Sign Up</Link>
      </div>  
      </>
    )
}
