"use client";
import { useEffect, useState } from "react";

export default function RedirectPage({ params }: { params: Promise<{ code: string }> }) {
  const [code, setCode] = useState<string | null>(null);
  
  useEffect(() => {
    const getCode = async () => {
      const { code: resolvedCode } = await params;
      setCode(resolvedCode);
    };
    
    getCode();
  }, [params]);
  
  useEffect(() => {
    if (code) {
      // Redirect to the API endpoint which handles the actual redirect logic
      window.location.replace(`/api/redirect/${code}`);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-[#512da8] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ede7f6] mx-auto mb-4"></div>
        <p className="text-[#ede7f6] text-xl">Redirecting...</p>
      </div>
    </div>
  );
}