import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import {  Link } from 'react-router-dom';
import { Card ,CardBody, Form ,FormGroup, Label, Button } from 'reactstrap';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const  [message, setMessage]  = useState("");
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    
   async function handleSubmit(e){
        e.preventDefault();
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your email for further instructions")
        } catch {
            setError("Failed to reset password.")
        }

        setLoading(false)
    }
    return (
        <>
      <Card>
          <CardBody>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <div className="alert alert-danger" color="danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Email</Label>
                    <input 
                      className="form-control"
                      placeholder="Email" 
                      type="email"
                      ref={emailRef}
                      required />
                  </FormGroup>
                  <Button 
                    className="w-100" 
                    color="primary" 
                    type="submit" 
                    disabled={loading}>Reset Password</Button>
              </Form>
              <div className=" w-100 text-center mt-3">
                <Link to="/login">Login</Link>
              </div>
          </CardBody>
      </Card>
      <div className=" w-100 text-center mt-2">
        Don't have an account? <Link to="/SignUp">Sign Up</Link>
      </div>  
        </>
    )
}
