import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const superAdminSignup = () => {
        navigate("/superAdminSignup")
    }
    return (
        <div className='text-center mt-5'>
            <div>
                <h2 className='mb-4'>
                    Welocome to DBPort
                </h2>

                <Button variant="primary" onClick={superAdminSignup}>create super admin</Button>
            </div>
        </div>
    )
}
