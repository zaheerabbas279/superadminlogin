import React from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const SuperAdSignup = () => {
    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const onSubmit = (data, e) => {
        e.preventDefault()

        axios.post('http://localhost:4000/register', {
            username: data.username,
            email: data.email,
            password: data.password,
            organization: data.organisation
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className='mt-5 text-center'>
            <div className='w-50 m-auto'>
                <h2 className='mb-4'>Super Admin Signup</h2>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" {...register("username", { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Organisation</Form.Label>
                        <Form.Control type="text" placeholder="Enter organisation" {...register("organisation", { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" {...register("email", { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" {...register("password", { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3 pt-3">
                        <Form.Control type="submit" value="Submit" />
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}
