import { pool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;

    try {
        const result = await pool.query(
            `UPDATE urls
             SET clicks = clicks + 1
             WHERE short_code = $1
             RETURNING original_url`,
            [code]
        );

        if (result.rows.length === 0) {
            return new Response('Not Found', { status: 404 });
        }

        return new Response(null, {
            status: 301,
            headers: { 
                Location: result.rows[0].original_url,
            },
        });
    } catch (error: any) {
        console.error("Redirect error:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
}