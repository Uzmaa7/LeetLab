import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;

        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded successfully
        // console.log("file is uploaded on cloudinary",
        // response.url);


        fs.unlinkSync(localFilePath)
        return response


    } catch (error) {
        console.log("uploadOnCloudinary error", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file
        // as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (publicIds, resource_type = "image") => {
    try {
        
        if (!publicIds || publicIds.length === 0) return null;

        //method to delete single file
        // const response = await cloudinary.uploader.destroy(publicId, {
        //     resource_type: "auto"
        // });

        //  Ise hamesha ek array bana do, chahe single string hi kyu na aaye
        // Taaki delete_resources hamesha sahi format receive kare

        const idsToDelete = Array.isArray(publicIds) ? publicIds : [publicIds];

        //method to delete multiple files in one go
        const response = await cloudinary.api.delete_resources(idsToDelete, {
            resource_type
        });


        console.log('Asset deleted on Cloudinary')
        return response;


    } catch (error) {
        console.log("Cloudinary delete error:", error);
        return null;
    }
}

export {uploadOnCloudinary, deleteFromCloudinary};

