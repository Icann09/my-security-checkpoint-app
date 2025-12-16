"use client";

import { createReport } from "@/lib/actions/report";
import { upload } from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getWITADateString } from "@/lib/utils";

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
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);
    abortControllerRef.current = new AbortController();

    try {
      const { signature, expire, token, publicKey } = await authenticator();
      const dateFolder = getWITADateString();
      const uploadRes = await upload({
        file,
        fileName: file.name,
        folder: `/checkpoints/${checkpointId}/${dateFolder}`,
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
        toast.warning("Report already exists for this checkpoint");
        return;
      }

      toast.success("Report submitted successfully ✅");
      setProgress(0);
      fileInputRef.current!.value = "";
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
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
    <div className="flex justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
        
        {/* Header */}
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Submit Checkpoint Report</h2>
          <p className="text-sm text-muted-foreground">
            Upload a photo to confirm your patrol
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        {/* Select image */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-sm font-medium hover:bg-muted/50 disabled:opacity-50"
        >
          <span className="text-2xl">📷</span>
          <span>Select Image</span>
        </button>

        {/* Progress */}
        {isUploading && (
          <div className="space-y-2">
            <progress
              value={progress}
              max={100}
              className="h-2 w-full overflow-hidden rounded bg-muted"
            />
            <p className="text-center text-xs text-muted-foreground">
              Uploading… {progress}%
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
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
      </div>
    </div>
  );
};

export default UploadReportBtn;
