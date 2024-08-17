"use client";
import React, { useEffect, useState } from "react";
import { LucideIcon, Calendar, FileText, MessageCircle } from "lucide-react"; // Import relevant icons

type TAnalyticsData = {
  totalForms: number;
  totalResponses: number;
  formsByMonth: Array<{ month: string; count: number }>;
  responsesByMonth: Array<{ month: string; count: number }>;
};

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<TAnalyticsData | null>(
    null
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-14">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h2 className="font-bold text-3xl ">Alalytics</h2>
        <div></div>
      </div>

      <div className="flex flex-wrap gap-4 py-4">
        <div className="border shadow-sm rounded-lg p-6 flex items-center w-full sm:w-1/2 lg:w-1/4">
          <FileText className="w-6 h-6 text-blue-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Forms</h2>
            <p className="text-xl font-bold">{analyticsData.totalForms}</p>
          </div>
        </div>

        <div className="border shadow-sm rounded-lg p-6 flex items-center w-full sm:w-1/2 lg:w-1/4">
          <MessageCircle className="w-6 h-6 text-green-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Responses</h2>
            <p className="text-xl font-bold">{analyticsData.totalResponses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
