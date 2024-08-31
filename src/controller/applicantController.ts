import { sendConfirmationEmail } from "../config/email-config";
import { Applicant } from "../models/Applicant";
import { Request, Response } from "express";

export const submitApplication = async (req: Request, res: Response) => {
    try{
        const { name, email, phone } = req.body;
        let resume : string  | undefined;
        if(req.file && (req.file as any).cloudStoragePublicUrl){
            resume= (req.file as any).cloudStoragePublicUrl;
        }else{
            return res.status(400).json({
                message: "No file uploaded"
            })
        }
        const applicant = new Applicant({name, email, phone, resume});
        await applicant.save();
        await sendConfirmationEmail(email, "Application Received", `Dear ${name}, We have received your application. Thank you for applying to our internship program.We will review your application and get back to you soon.`);
        return res.status(201).json({
            message: "Application submitted", applicant
        })
    }catch(err){
        return res.status(500).json({
            message: "Error submitting application", err
        })
    }
}