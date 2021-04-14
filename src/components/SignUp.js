import React, { useRef, useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Button} from 'reactstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {
const emailRef = useRef();
const passwordRef = useRef();
const passwordConfirmRef = useRef();
const { signup } = useAuth();
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const history = useHistory();


async function handleSubmit(e){
  e.preventDefault()
  console.log(emailRef.current.value)
  if(passwordRef.current.value !== passwordConfirmRef.current.value){
  return (
    setError("password does not match.")
    )
  }

  try{
    setError('')
    setLoading(true)
    await signup(emailRef.current.value, passwordRef.current.value)
    history.push('/')
    } catch{
      setError("Failed to make an account")
    }
    setLoading(false)
  }

  return (
    <>
    
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <div color="danger">{error}</div> }
          <Form onSubmit={handleSubmit}>
          <FormGroup id="email">
              <Label>Email</Label>
              <input className="form-control" type="email" ref={emailRef} required/>
            </FormGroup>            
            <FormGroup id="password">
              <Label>Pasword</Label>
              <input className="form-control" type="password" ref={passwordRef} required/>
            </FormGroup>            
            <FormGroup id="password-confirm">
              <Label>Password Confirmation</Label>
              <input className="form-control" type="password" ref={passwordConfirmRef} required/>
            </FormGroup>
            <Button className="w-100" color="primary" type="submit" disabled={loading}>Sign Up</Button>
          </Form>
        </CardBody>
      </Card>

      <div className=" w-100 text-center mt-2">
        Already have an account? <Link to="/Login">Log In</Link>
      </div>

    </>
  );
}
