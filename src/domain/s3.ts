import { S3Client } from '@aws-sdk/client-s3';
export const s3Client = new S3Client({
    region: process.env.AWS_REGION || "ap-northeast-1",
    endpoint: process.env.AWS_ENDPOINT_URL || "",
    forcePathStyle: true, // MinIO利用時には必要そう。
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
