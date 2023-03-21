import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import ReactDOM from 'react-dom'

export const AdDashboard = () => {
    const [editField, setEditField] = useState(false)

    const navigate = useNavigate();
    const adminSignup = () => {
        console.log("safsaf");
        navigate('/superadmin/adminsignup')
    }
    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
    });
    return (
        <div className='text-center mt-5'>
            <div>
                <h2 className='mb-4'>
                    Welocome to Super Admin Dashboard
                </h2>
                <div>
                    <Button variant="primary" onClick={adminSignup} className="mx-3">create admin</Button>
                    <Button variant="success" onClick={e => { setEditField(!editField) }} className="mx-3">Edit fields</Button>
                </div>
                <div>
                    <form onSubmit={handleSubmit(data => console.log(data))}>
                        <ul className='my-5'>
                            {fields.map((item, index) => (
                                <li className='mb-3' key={item.id}>
                                    <input className='mr-3' type="text" {...register(`test.${index}.input`, { required: true })} />
                                    {/* {errors.(`test.${index}.firstName`) && <span>select field</span>} */}

                                    <select
                                        // className="custom-select"
                                        defaultValue=""
                                        name={`test.${index}.select`}
                                        {...register(`test.${index}.select`, { required: true })}
                                    >
                                        <option value=""></option>
                                        <option value="INT(10)">INT</option>
                                        <option value="VARCHAR(30)">VARCHAR</option>
                                    </select>
                                    <button type="button" className='ml-3' onClick={() => remove(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <div className={editField ? "d-block" : "d-none"}>
                            <button
                                type="button"
                                onClick={() => append({ input: "", select: " " })}
                            >
                                append
                            </button>
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
