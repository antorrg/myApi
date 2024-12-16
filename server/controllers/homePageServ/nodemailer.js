import nodemailer from 'nodemailer'
import env from '../../envConfig'

// Configuración de Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.GmailUser,
        pass: env.GmailPass,
    }
});

// Configuración del correo electrónico
let mailOptions = {
    from: email,
    to: env.GmailUser,
    subject: `Asunto: ${asunto}`,
    text: mensaje
};
export default {
    transporter,
    mailOptions,
}