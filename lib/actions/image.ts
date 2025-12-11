export async function uploadToImageKit(file: File) {
  const today = new Date().toISOString().split("T")[0]; // 2025-12-11
  const ext = file.name.split(".").pop(); // jpg, png, webp, etc

  const auth = await fetch("/api/imagekit-auth").then(res => res.json());

  const formData = new FormData();
  formData.append("file", file);
  formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire);
  formData.append("token", auth.token);

  // Folder for uploads
  formData.append("folder", "/checkpoints");

  // Safe + clean file name
  formData.append("fileName", `${today}-${Date.now()}.${ext}`);

  const upload = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  return upload.json();
}
