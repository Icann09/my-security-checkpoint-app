"use client";

import { createReport } from "@/lib/actions/report";
import { upload } from "@imagekit/next";
import { useRef, useState } from "react";

const UploadReoportBtn = ({ checkpointId }: { checkpointId: string }) => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const authenticator = async () => {
    const res = await fetch("/api/auth/imagekit");
    if (!res.ok) throw new Error("Auth failed");
    return res.json();
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return alert("Select a file");

    abortControllerRef.current = new AbortController();

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadRes = await upload({
        file,
        fileName: file.name,
        folder: `/checkpoints/${checkpointId}`,
        signature,
        expire,
        token,
        publicKey,
        onProgress: (e) =>
          setProgress(Math.round((e.loaded / e.total) * 100)),
        abortSignal: abortControllerRef.current.signal,
      });

      const result = await createReport({
        checkpointId,
        imageUrl: uploadRes.url,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to save report");
      }

      alert("Report submitted successfully ✅");
      setProgress(0);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
    setProgress(0);
  };

  return (
    <>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={cancelUpload} className="ml-2">
        Cancel
      </button>
      <progress value={progress} max={100} />
    </>
  );
};

export default UploadReoportBtn;
