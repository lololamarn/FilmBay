import React, { useState } from 'react';
import { IoIosReturnLeft } from 'react-icons/io';
import { sendTokenEmail } from '../DB_Components/mailSender';
import NewPassword from '../Desing_Components/new_password'; 

const PassRecovery: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [generatedToken, setGeneratedToken] = useState('');
    const [enteredToken, setEnteredToken] = useState('');
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleForgotPassword = async () => {
        try {
            
            const uniqueToken = Math.random().toString(36).substr(2, 10);
            setGeneratedToken(uniqueToken); 

            
            const emailSent = await sendTokenEmail(email, uniqueToken);

            if (emailSent) {
                setSuccessMessage('Se ha enviado un correo con el token de verificación.');
                setShowTokenInput(true); 
            } else {
                setError('Error al enviar el correo');
            }
        } catch (error) {
            setError('Error de red al enviar el correo');
        }
    };

    const handleTokenValidation = () => {
        
        if (enteredToken.trim() === '') {
            setError('Por favor ingresa el token de verificación.');
            return;
        }

        if (enteredToken === generatedToken) { 
            setSuccessMessage('Token validado correctamente.');
            setShowTokenInput(false); 
            setShowNewPassword(true); 
        } else {
            setError('Token no válido. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="max-w-md w-full p-8 bg-gray-200 rounded-lg shadow-lg relative">
                {showTokenInput ? (
                    <>
                        <button onClick={onClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                            <IoIosReturnLeft className="h-8 text-white" />
                        </button>
                        <h1 className="text-3xl font-bold text-center mb-8 text-black">Recuperar Contraseña</h1>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={enteredToken}
                                onChange={(e) => setEnteredToken(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                placeholder="Ingresa el Token de Verificación"
                            />
                        </div>
                        <button onClick={handleTokenValidation} className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-300">
                            Validar Token
                        </button>
                        {error && <p className="w-full bg-black text-red-700 font-bold py-2 px-4 rounded-md mt-4 text-center">{error}</p>}
                        {successMessage && <p className="w-full bg-black text-green-400 font-bold py-2 px-4 rounded-md mt-4 text-center">{successMessage}</p>}
                    </>
                ) : showNewPassword ? (
                    <NewPassword onClose={onClose} userEmail={email} />

                ) : (   
                    <>
                        <button onClick={onClose} className="absolute top-2 right-2 text-3xl bg-red-900 text-white p-2 rounded-full">
                            <IoIosReturnLeft className="h-8 text-white" />
                        </button>
                        <h1 className="text-3xl font-bold text-center mb-8 text-black">Recuperar Contraseña</h1>
                        <div className="mb-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                placeholder="Correo Electrónico"
                            />
                        </div>
                        <button onClick={handleForgotPassword} className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-md transition duration-300">
                            Recuperar Contraseña
                        </button>
                        {error && <p className="w-full bg-black text-red-700 font-bold py-2 px-4 rounded-md mt-4 text-center">{error}</p>}
                        {successMessage && <p className="w-full bg-black text-green-400 font-bold py-2 px-4 rounded-md mt-4 text-center">{successMessage}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default PassRecovery;