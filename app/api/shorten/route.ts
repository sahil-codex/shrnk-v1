import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import crypto from "crypto";



export async function POST(request: Request) {
   try{
    const body = await request.json();
    const { longUrl} = body;

    if(!longUrl || typeof longUrl !=="string" || longUrl.trim()==="") {
         return NextResponse.json(
            {error: "URL is required"},
            {status:400}
         );
    }
    let parsedUrl:URL;
    try {
        parsedUrl = new URL(longUrl);
         }catch  {
            return NextResponse.json(
            { error: "Invalid URL format" },
            { status: 400 }
            );
        }
        
        if(parsedUrl.protocol !=="http:"&& parsedUrl.protocol !=="https:"){
            return NextResponse.json(
              {error:"Only HTTP and HTTPS protocol is allowed"},
              {status:400}
            );
        }
    

      const maxAttempts = 5;
    for(let i = 0;i<maxAttempts;i++){
               const shortCode = crypto.randomBytes(4).toString("hex");
               try{
                   await pool.query(`
                       INSERT INTO urls (short_code,original_url)
                        VALUES ($1, $2)`,[shortCode, longUrl]
                   );
                   return NextResponse.json({
                       shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
                   });
               }catch(error: any){
                   if(error.code ==="23505"){
                       continue;
                   }
                   throw error;
               }
           }
                   return NextResponse.json(
                       {error: "Could not generate short URL. Try again."},
                       {status: 500}
                   );
                   
             } catch  {
              return NextResponse.json(
        {error:"Invalid JSON body"},
        {status:400}
             );
        }


};