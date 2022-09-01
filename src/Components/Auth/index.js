import './styles.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

import { Button } from '@mui/material';

import { useDispatch } from 'react-redux';
import { signin, signup } from '../../Redux/actions/auth';

import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
            dispatch(signin(form, navigate));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="sign__pre">
            <div className="sign__container">
                <div className="sign__subcontainer">

                    <div className="sign__title">
                        <h3>{isSignup ? "Log In" : "Sign In"}</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='first__last'>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </div>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        <Button type="submit" fullWidth variant="contained" color="primary" size="small">
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <div className="already">
                            <div item>
                                <Button onClick={switchMode}>
                                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
