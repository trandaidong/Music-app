import { Request, Response, NextFunction } from "express"
import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"

// cloundinary
cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_KEY,
    // api_secret: process.env.CLOUD_SERCET, 

    cloud_name: "dt2itjyld",
    api_key: "963242911373137",
    api_secret: "KTWqGpu4gXXY48-gB-da-sN4S1w"
});
// end cloundinary

let streamUpload = async (buffer: any) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = async (buffer) => {
    let result = await streamUpload(buffer);
    return result["url"];
}

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        req.body[req["file"].fieldname] = await uploadToCloudinary(req["file"].buffer)
    }catch(error){
        console.log(error);
    }
    next();
}
export const uploadFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const key in req["files"]) {
        // key: avatar, audio
        req.body[key]=[];

        const array=req["files"][key];
        for (const item of array) {
            try{
                const result= await uploadToCloudinary(item.buffer)
                req.body[key].push(result);
            }catch(error){
                console.log(error);
            }
        }
    }
    next();
}