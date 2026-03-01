"use client";
import UrlShortenerForm from "@/components/UrlShortenerForm";
export default function Home() {
  return (
   <>
   <div className="flex flex-col items-center  min-h-screen bg-[#512da8]">
   <h1  className=" text-[#ede7f6] text-4xl font-bold text-center pt-10">Shorten Your Links</h1>
   <p className="text-[#ede7f6] pt-2 mb-6 text-xl font-semibold">Paste a long URL below to generate a short, shareable link</p>
  
    <UrlShortenerForm/>
  </div>
   </>
  );
}
