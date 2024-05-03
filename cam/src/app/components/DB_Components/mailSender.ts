"use server"

import nodemailer from 'nodemailer';
import cryptoRandomString from 'crypto-random-string';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correo',
        pass: 'hemq dhzt wzcb kdpu',
    },
});

export const generateUniqueToken = () => {
    return cryptoRandomString({ length: 10, type: 'numeric' });
};

export const sendTokenEmail = async (email: string, token: string) => {
    const mailOptions = {
        from: 'tu-correo@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña - Token de Verificación',
        text: `Tu token de verificación es: ${token}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
    }
};
