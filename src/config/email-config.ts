import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS 
    }
})


export const sendConfirmationEmail = async(to: string, subject: string, text: string) => {
    const mailOption = {
        from : process.env.EMAIL_User,
        to,
        subject,
        text
    }
    return transporter.sendMail(mailOption)
}