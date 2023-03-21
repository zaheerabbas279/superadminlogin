import React from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export const SuperAdlogin = () => {
    const navigate = useNavigate();
    const superAdminLoginSubmit = (e) => {
        e.preventDefault()
        navigate('/superadmin/dashboard')
    }
    return (

        <div className='mt-5 text-center'>
            <div className='w-50 m-auto'>
                <h2 className='mb-4'>Super Admin Login</h2>

                <Form onSubmit={superAdminLoginSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" required />
                    </Form.Group>
                    <Form.Group className="mb-3 pt-3">
                        <Form.Control type="submit" value="Submit" />
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}
