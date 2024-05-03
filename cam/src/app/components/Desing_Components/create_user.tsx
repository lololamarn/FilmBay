import React, { useState, useEffect } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';

const UserCreate: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log('Cuenta creada exitosamente');
                setSuccessMessage('Cuenta creada exitosamente');
            } else {
                const data = await response.json();
                setError(data.error || 'Error al crear la cuenta');
            }
        } catch (error) {
            setError('Error de red');
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                onClose();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="max-w-md w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                    <IoIosReturnLeft className="h-8 text-white" />
                </button>
                <h1 className="text-3xl font-bold text-center mb-8 text-black">Crear Cuenta</h1>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Correo Electrónico"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Contraseña"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Confirmar Contraseña"
                    />
                </div>
                <button onClick={handleCreateAccount} className="w-full  text-white bg-gray-900 hover:bg-gray-200 hover:text-black font-bold py-2 px-4 rounded-md transition duration-300">
                    Crear Cuenta
                </button>
                {error && <p className="w-full bg-black text-red-700 font-bold py-2 px-4 rounded-md mt-4 text-center">{error}</p>}
                {successMessage && <p className="w-full bg-black text-green-400 font-bold py-2 px-4 rounded-md mt-4 text-center">{successMessage}</p>}
            </div>
        </div>
    );
};

export default UserCreate;