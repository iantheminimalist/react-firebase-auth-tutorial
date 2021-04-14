import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {Card, CardBody, Form, FormGroup, Label, Button } from 'reactstrap';



export default function UpdateProfile() {
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const history= useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          return setError("Passwords do not match")
        }
    
        const promises = [];
        //console.log(promises);
        setLoading(true)
        setError("")
    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
        .then(() => {
          history.push("/")
        })
        .catch((err) => {
          setError("Failed to update account. ");
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return (
    <>
      <Card>
        <CardBody>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <FormGroup id="email">
                  <Label>Email</Label>
                  <input 
                    className="form-control" 
                    type="email" 
                    ref={emailRef} required 
                    defaultValue={currentUser.email}
                  />
              </FormGroup>
              <FormGroup id="password">
                  <Label>Password</Label>
                  <input 
                    className="form-control" 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Leave it blank to the same password" 
                  />
              </FormGroup>
              <FormGroup id="confirm-password">
                  <Label>Confirm Password</Label>
                  <input 
                    className="form-control" 
                    type="password" 
                    ref={confirmPasswordRef} 
                    placeholder="Leave it blank to the same password"
                  />

              </FormGroup>
                <Button className="w-100" color="primary" type="submit" disabled={loading}>Update Profile</Button> 
            </Form> 
        </CardBody>
      </Card>
      <div className=" w-100 text-center mt-2">
        Already have an account? <Link to="/">Cancel</Link>
      </div>
  
    </>
    )
}
