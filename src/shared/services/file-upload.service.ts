import api from "@/core/api/ApiService";

interface CloudinarySignatureRequest {
  timestamp: string;
  folder: string;
  signature: string;
  apiKey: string;
  cloudName: string;
}

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

type FolderOptions = "avatar" | "userCover" | "bookCover";

export const upload = async (
  path: string,
  file: File,
  { type }: { type: FolderOptions },
) => {
  try {
    // 1. Get signature
    const res = await api.get<CloudinarySignatureRequest>(
      "/cloudinary/signature",
      {
        params: { type },
      },
    );

    const { apiKey, timestamp, signature, cloudName, folder } = res.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD;

    const uploadUrl = `${cloudinaryUrl}/${cloudName}/image/upload`;

    const cloudinaryRes = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!cloudinaryRes.ok) {
      const err = await cloudinaryRes.text();
      throw new Error(err);
    }

    const cloudinaryData: CloudinaryUploadResponse = await cloudinaryRes.json();

    await api.patch(path, {
      secureUrl: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
    });

    return cloudinaryData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
