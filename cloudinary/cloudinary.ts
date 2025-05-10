'use server';

import { getCurrentUser } from '@/lib/action/auth.action';
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
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    // @ts-ignore
    return null;
  }
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
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    // @ts-ignore
    return null;
  }
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

// Helper function to extract public ID from Cloudinary URL
function getPublicIdFromUrl(imageUrl: string): string | null {
  try {
    const urlParts = imageUrl.split('/');
    const publicIdWithFormat = urlParts
      .slice(urlParts.indexOf('upload') + 2)
      .join('/');
    const publicId = publicIdWithFormat.substring(
      0,
      publicIdWithFormat.lastIndexOf('.')
    );
    // Ensure the public ID includes the folder if it exists
    // Example URL: https://res.cloudinary.com/demo/image/upload/v123/folder/image.jpg
    // Public ID should be: folder/image
    if (urlParts.includes('e-commerce-dashboard-products')) {
      const folderIndex = urlParts.indexOf('e-commerce-dashboard-products');
      if (folderIndex > -1 && folderIndex < urlParts.length - 1) {
        return urlParts
          .slice(folderIndex)
          .join('/')
          .substring(0, urlParts.slice(folderIndex).join('/').lastIndexOf('.'));
      }
    }
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID from URL:', imageUrl, error);
    // @ts-ignore
    return null;
  }
}

export async function deleteImageByPublicId(publicId: string): Promise<void> {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    // @ts-ignore
    return null;
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error(
            `Failed to delete image ${publicId} from Cloudinary:`,
            error
          );
          reject(error.message || `Failed to delete image ${publicId}`);
        } else {
          if (
            result &&
            result.result !== 'ok' &&
            result.result !== 'not found'
          ) {
            console.warn(
              `Cloudinary deletion of ${publicId} result was not 'ok':`,
              result.result
            );
            // Potentially reject here if 'not found' is also an error for your use case
            // For now, we resolve as the operation itself didn't throw an SDK error
          }
          resolve();
        }
      }
    );
  });
}

export async function deleteImagesByUrls(imageUrls: string[]): Promise<void> {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    // @ts-ignore
    return null;
  }
  if (!imageUrls || imageUrls.length === 0) {
    return;
  }
  const deletePromises = imageUrls.map((url) => {
    const publicId = getPublicIdFromUrl(url);
    if (publicId) {
      return deleteImageByPublicId(publicId);
    } else {
      console.warn(
        `Could not extract public_id from URL: ${url}, skipping deletion.`
      );
      return Promise.resolve(); // Resolve to not break Promise.all
    }
  });

  try {
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting one or more images from Cloudinary:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete one or more images: ${error.message}`);
    } else {
      throw new Error(
        'Failed to delete one or more images due to an unknown error.'
      );
    }
  }
}

export async function replaceImages(
  existingImageUrls: string[],
  newImageFiles: File[]
): Promise<string[]> {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (!isAdmin) {
    // @ts-ignore
    return null;
  }
  // If there are no new files to upload, return the existing URLs
  if (!newImageFiles || newImageFiles.length === 0) {
    return existingImageUrls;
  }

  // If there are new files, first delete the old ones
  if (existingImageUrls && existingImageUrls.length > 0) {
    try {
      await deleteImagesByUrls(existingImageUrls);
    } catch (error) {
      console.error(
        'Failed to delete existing images, proceeding with upload anyway:',
        error
      );
    }
  }
  return uploadImages(newImageFiles);
}
