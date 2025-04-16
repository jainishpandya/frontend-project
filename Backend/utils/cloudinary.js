import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const uploadFile = async(filePath, folderPath, id) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderPath,
            public_id: id + "_" + Date.now(),
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log("upload error: ", error.message);
        
    }
}

 export default { cloudinary , uploadFile};