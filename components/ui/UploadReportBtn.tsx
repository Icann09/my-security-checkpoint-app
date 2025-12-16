"use client";

import { createReport } from "@/lib/actions/report";
import { upload } from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";

const UploadReportBtn = ({ checkpointId }: { checkpointId: string }) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const authenticator = async () => {
    const res = await fetch("/api/auth/imagekit");
    if (!res.ok) throw new Error("Auth failed");
    return res.json();
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setIsUploading(true);
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
        toast("Report Already exist");
        return;
      }


      alert("Report submitted successfully ✅");
      setProgress(0);
      fileInputRef.current!.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
    setProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-sm space-y-4 bg-accent">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Select file */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-xl border border-dashed border-muted px-4 py-3 text-sm font-medium hover:bg-muted/50"
        disabled={isUploading}
      >
        📷 Select Image
      </button>

      {/* Upload actions */}
      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload Report"}
        </button>

        {isUploading && (
          <button
            onClick={cancelUpload}
            className="rounded-xl border px-4 py-3 text-sm"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Progress */}
      {isUploading && (
        <div className="space-y-1">
          <progress
            value={progress}
            max={100}
            className="w-full h-2 rounded"
          />
          <p className="text-xs text-muted-foreground text-center">
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadReportBtn;
