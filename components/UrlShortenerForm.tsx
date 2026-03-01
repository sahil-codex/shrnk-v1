"use client";
import {useState} from 'react';
export default function UrlShortenerForm(){
  const[longUrl,setLongUrl] = useState('')
  const[shortUrl, setShortUrl] = useState('')
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState('')
    
  async function handleSubmit() {
    setLoading(true);
  setError("");
  setShortUrl("");

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to shorten URL");
    }

    const data = await res.json();
    setShortUrl(data.shortUrl);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
return(
  <div  className = "space-y-4 w-full max-w-xl mx-auto">
     <div className="flex items-center gap-2 w-full">
    <input
      type = "url"
      placeholder="https://example.com"
      value={longUrl}
      onChange={(e)=> setLongUrl(e.target.value)}
      required
      className="flex-1 bg-amber-50 rounded-lg px-4 h-12 outline-none"
      />
      <button 
      type = "button"
      onClick={handleSubmit}
       disabled = {loading}
        className="bg-[#7c4dff] h-12 px-6 rounded-lg text-white text-lg font-semibold disabled:opacity-50 whitespace-nowrap">
          {loading ?'Shortening...':'Shorten URL'}
        </button>
        </div>
        {error && <p className="text-red-500 text-left">{error}</p>}
        {shortUrl && <Result shortUrl = {shortUrl}/>}
  </div>
);
} 
  
function Result({shortUrl}:{shortUrl:string}){
    function copy(){
        navigator.clipboard.writeText(shortUrl);
        alert("Copied!");
    }
    return(
        <div className='bg-gray-100 p-3 rounded flex justify-between items-center'>
            <a
            href = {shortUrl}
            target = "_blank"
            rel = "noopener noreferrer"
            className='text-blue-600 truncate'>
                {shortUrl}
            </a>
            <button type="button" onClick ={copy} className="text-sm underline">
                Copy
            </button>
        </div>
    );
}