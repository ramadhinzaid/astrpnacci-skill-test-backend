import { getDownloadURL, getStorage } from "firebase-admin/storage";
import { BUCKET_NAME } from "../config/firebase";

export const uploadFile = async (
  file: Express.Multer.File
): Promise<string> => {
  const bucket = getStorage().bucket(BUCKET_NAME);
  const result = bucket.file(Date.now() + "-" + file.originalname);
  const blobStream = result.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = await getDownloadURL(result);
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};
