"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function UploadImageButton({
  onUploaded,
}: {
  onUploaded?: (url: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);

    try {
      // get ImageKit signature
      const authResp = await fetch("/api/imagekit/auth");
      const auth = await authResp.json();

      const form = new FormData();
      form.append("file", file);
      form.append("publicKey", auth.publicKey);
      form.append("signature", auth.signature);
      form.append("expire", auth.expire);
      form.append("token", auth.token);

      const uploadResp = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: form,
      });

      const data = await uploadResp.json();
      if (data?.url) {
        onUploaded?.(data.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Preview Box */}
      {preview ? (
        <div className="w-40 h-40 rounded-lg overflow-hidden border shadow-sm">
          <Image
            src={preview}
            alt="preview"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="w-40 h-40 flex items-center justify-center border rounded-lg text-sm text-muted-foreground">
          No image selected
        </div>
      )}

      {/* File Input */}
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="cursor-pointer"
      />

      <Button disabled={uploading} className="w-full">
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
}
