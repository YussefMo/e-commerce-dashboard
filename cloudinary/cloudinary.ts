'use server';

import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse
} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function uploadImage(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64Data}`;

      const result: UploadApiResponse = await cloudinary.uploader.upload(
        dataUri,
        {
          folder: 'e-commerce-dashboard-products',
          resource_type: 'image' // Explicitly set resource type
        }
      );
      resolve(result.secure_url);
    } catch (error) {
      console.error('Cloudinary upload error (full error object):', error);
      const apiError = error as UploadApiErrorResponse;
      if (apiError && typeof apiError === 'object' && 'message' in apiError) {
        console.error('Cloudinary API error message:', apiError.message);
        reject(apiError.message || 'Failed to upload image to Cloudinary');
      } else {
        // Fallback for other types of errors
        reject(
          'Failed to upload image to Cloudinary due to an unexpected error.'
        );
      }
    }
  });
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload one or more images: ${error.message}`);
    } else {
      throw new Error(
        'Failed to upload one or more images due to an unknown error.'
      );
    }
  }
}
