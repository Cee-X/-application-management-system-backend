import { Schema, model, Document } from "mongoose";
interface IApplication extends Document{
    name : string;
    email : string;
    phone : string;
    resume : string
}

const ApplicantSchema = new Schema({
    name : {type : String, require: true},
    email : {type: String , require: true},
    phone : {type: String , require: true},
    resume : {type: String , require: true},
})

export const Applicant = model<IApplication>("Applicant", ApplicantSchema)