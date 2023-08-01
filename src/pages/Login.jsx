import React from 'react';
import LoginComponent from '../components/LoginComponent';

const Login = ({prevLocation}) => {

    return (
        <section className='login'>
            <LoginComponent prevLocation={prevLocation} />
        </section>
    )

}

export default Login;