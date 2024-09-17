import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ Component }) => {

    const accessToken = localStorage.getItem("isLoggedin");

    return accessToken ? (
        Component === LoginPage ? (
            <div className='notFound'>
                <div>
                    <div>
                        <h1>You are already Logged in</h1>
                        <Link to='/'>Return to <span>Home</span></Link>
                    </div>
                </div>
            </div>
        ) : (
            <Component />
        )
    ) : (
    <>
        {/* <LoginPage /> */}
        <Navigate to="/login" />
    </>
    );
};

export default ProtectedRoute;