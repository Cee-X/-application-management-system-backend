import { bucket } from "../config/cloud-config";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("resume");

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: "Error uploading file in uploadMiddleware", err
            })
        }
        next();
    })
}

export const upoladToCloud = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded in upoladToCloud"
        })
    }
    const file = req.file as Express.Multer.File;
    const blob = bucket.file(`${Date.now()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on("error", (err) => {
        return res.status(500).json({
            message: "Error uploading file in blobStream"
        })
    });
    blobStream.on("finish", async() => {
        try{
            await blob.makePublic();
            const publicUrl =`https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            (file as any).cloudStoragePublicUrl = publicUrl;
            next();
        }catch(err){
            return res.status(500).json({
                message: "Error uploading file in blobStream"
            })
        }
    });
    blobStream.end(file.buffer);
}
