
import React, { useState } from 'react';

const NewPassword: React.FC<{ onClose: () => void; userEmail: string }> = ({ onClose, userEmail }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSavePassword = async () => {
        try {
            if (password.trim() === '' || confirmPassword.trim() === '') {
                
                setError('Por favor ingresa la nueva contraseña y confírmala.');
                return;
                
            }

            if (password !== confirmPassword) {
                
                setError('Las contraseñas no coinciden. Inténtalo de nuevo.');
                return;
            }

            const response = await fetch('http://localhost:8080/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, newPassword: password }),
            });

            if (response.ok) {
                onClose();
            } else {
                const data = await response.json();
                setError(data.error || 'Error al cambiar la contraseña. Inténtalo de nuevo.');
            }
        } catch (error) {
            setError('Error de red al cambiar la contraseña.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="max-w-md w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
                <h1 className="text-3xl font-bold text-center mb-8 text-black">Nueva Contraseña</h1>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                        placeholder="Nueva Contraseña"
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
                <button onClick={handleSavePassword} className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-300">
                    Guardar Contraseña
                </button>
                {error && <p className="w-full bg-black text-red-700 font-bold py-2 px-4 rounded-md mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default NewPassword;