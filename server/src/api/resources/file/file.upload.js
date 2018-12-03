import cloudinary from "cloudinary";
import streamToBuffer from "stream-to-buffer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async file => {
  const { mimetype, stream } = await file;

  // process image
  return new Promise((resolve, reject) => {
    if (!Object.is(mimetype, "image/jpeg")) {
      throw new Error("File type not supported");
    }

    streamToBuffer(stream, (err, buffer) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "raw" }, (err, result) => {
          if (err) {
            throw new Error("File not uploaded!");
          }
          return resolve({ url: result.url });
        })
        .end(buffer);
    });
  });
};
