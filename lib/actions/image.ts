"use server"

import config from "../config";

export async function uploadToImageKit(file: File) {
  const apiEndpoint = config.env.apiEndpoint;
  const today = new Date().toISOString().split("T")[0];
  const ext = file.name.split(".").pop();

  const auth = await fetch(`${apiEndpoint}/api/auth/imagekit`).then(res => res.json());

  const formData = new FormData();
  formData.append("file", file);
  formData.append("publicKey", auth.publicKey);
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire);
  formData.append("token", auth.token);

  // FIX HERE — NO LEADING SLASH
  formData.append("folder", "checkpoints");

  formData.append("fileName", `${today}-${Date.now()}.${ext}`);

  const upload = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    { method: "POST", body: formData }
  );

  const data = await upload.json();
  console.log("UPLOAD RESULT:", data);

  return data;
}
