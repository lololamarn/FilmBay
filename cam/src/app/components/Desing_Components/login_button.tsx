"use client"

import React, { useState, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import {IoPersonOutline} from 'react-icons/io5';

import UserCreate from './create_user';
import PassRecovery from './pass_recovery';

const LoginPage: React.FC<{ onClose: () => void, onLoginSuccess: (email: string, userType: string) => void }> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showPassRecovery, setShowPassRecovery] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                const userData = await response.json();
                const user = userData.user;
                
                
                console.log('Datos del usuario 2:', user);
                console.log('Datos del usuario 2:', user.User_type);
                
                onLoginSuccess(email, user.User_type);
                
                onClose();
            } else {
                const data = await response.json();
                setError(data.error || 'Authentication error');
            }
        } catch (error) {
            setError('Network error');
        }
    };

    const handleOpenCreateUser = () => {
        setShowCreateUser(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full p-8 bg-black rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                    <IoMdCloseCircleOutline className="h-8 text-white" />
                </button>
                <h1 className="text-3xl font-bold text-center mb-8 text-white">Iniciar Sesión</h1>
                <div className="mb-4 text-black">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Correo Electrónico"
                    />
                </div>
                <div className="mb-6 text-black">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Contraseña"
                    />
                </div>
                {error &&
                    <>
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                        <button
                            onClick={() => setShowPassRecovery(true)}
                            className="w-full bg-red-900 hover:bg-red-400 text-white font-bold py-2 px-4 mb-2 rounded-md transition duration-300"
                        >
                            Recuperar Contraseña
                        </button>
                    </>
                }
                {showPassRecovery && <PassRecovery onClose={() => setShowPassRecovery(false)} />}
                <button
                    onClick={handleLogin}
                    className="w-full bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 mb-4"
                >
                    Iniciar Sesión
                </button>
                <button
                    onClick={handleOpenCreateUser}
                    className="w-full bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Crear cuenta
                </button>
                {showCreateUser && <UserCreate onClose={() => setShowCreateUser(false)} />}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedUserType = localStorage.getItem('userType');
        if (storedEmail && storedUserType) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            setUserType(storedUserType);
        }
    }, []);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLoginSuccess = (email: string, userType: string) => {
        
        setIsLoggedIn(true);
        setEmail(email);
        setUserType(userType);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', userType);

        window.location.reload();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setUserType('');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <div className="absolute bottom-0 right-0 p-2 bg-green-500 text-white font-bold">{email}</div>
                    {userType === '0' && (
                        <button className="absolute top-2 right-2 text-3xl bg-blue-900 text-white p-2 rounded-full">
                            <a href="/components/Admin_Components/">
                                <IoPersonOutline className="h-9 lg:h-10 p-2 text-gray-100 text-4xl mb-1" />
                            </a>
                        </button>
                    )}
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            ) : (
                <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            )}
            {showLogin && <LoginPage onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default App;
