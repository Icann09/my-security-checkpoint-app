"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/lib/admin/report";
import { getWITADateAdmin } from "@/lib/utils";
import Image from "next/image";

// Types inferred from schema
export type Report = {
  id: string;
  guardId: string;
  checkpointId: string;

  reportDate: Date;
  imagaeTakenAt: Date;
  createdAt: Date;

  shift: string;
  imageUrl: string;

  guard: {
    fullName: string;
  } | null;

  checkpoint: {
    description: string;
  } | null;
};



export default function ReportsDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);

      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Reports Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Daily checkpoint patrol reports
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Shift</th>
              <th className="px-4 py-3">Guard</th>
              <th className="px-4 py-3">Checkpoint</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Taken At</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center">
                  Loading reports...
                </td>
              </tr>
            )}

            {!loading && reports.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center">
                  No reports found
                </td>
              </tr>
            )}

            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t hover:bg-muted/30 transition"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {report.reportDate.toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 capitalize">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {report.shift}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {report.guard?.fullName ?? "—"}
                </td>

                <td className="px-4 py-3">
                  {report.checkpoint?.description ?? "—"}
                </td>

                <td className="px-4 py-3">
                  <a
                    href={report.imageUrl}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    View
                  </a>
                </td>
                
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {report.imagaeTakenAt.toISOString().slice(11,16)}
                </td>

          

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
