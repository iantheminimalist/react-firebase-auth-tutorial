import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

export default function DashBoard() {
  const [error, setError ]  = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout(){
        setError('')

        try{
          await logout()
          history.push('/login')

        }catch{
          setError('Failed to log out. Please Fix Me!!!')
        }
    }

    return (
        <>
          <Card>
            <CardBody>
                <h2 className="text-center mb-4" >Profile</h2>
                {error && <div color="danger">{error}</div> }
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary mt-3 w-100 ">Update Profile</Link>
            </CardBody>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/" onClick={handleLogout}>Log Out</Link>
          </div>  
        </>
    )
}
