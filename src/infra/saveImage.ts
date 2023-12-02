import { s3Client } from "../domain/s3";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const saveImage = async (image: Express.Multer.File) => {
    const bucketName = process.env.BUCKET_NAME;
    try {
        const inputParams = {
            Bucket: bucketName,
            Key:    image.originalname,
            Body:   image.buffer,
        };
        await s3Client.send(new PutObjectCommand(inputParams));
    } catch (error) {
        console.error('File write error:', error);
        throw new Error(`File write error: ${error}`);
    }
}