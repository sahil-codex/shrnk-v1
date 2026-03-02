# Shrnk - URL Shortener

A simple and efficient URL shortening service built with Next.js 13+ App Router.

## Features

- Shorten long URLs into compact links
- Track click counts for shortened URLs
- Clean, responsive user interface
- Fast redirects using 301 status codes

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Deployment**: Vercel (recommended) or any Node.js hosting platform

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL database
- npm or yarn

### Development Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shrnk
```

2. Install dependencies:
```bash
npm install
```

3. Set up your database:
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```

For production, create a `.env.production` file with your production database URL.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `DATABASE_URL` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms

For other hosting platforms:
1. Build the project: `npm run build`
2. Set the `DATABASE_URL` environment variable
3. Start the server: `npm start`

## Database Schema

The application expects a `urls` table with the following structure:

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(8) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

- `POST /api/shorten` - Create a shortened URL
- `GET /api/redirect/[code]` - Redirect to original URL and track clicks

## Common Deployment Issues

### Environment Variables
Make sure your `DATABASE_URL` is properly set in your production environment.

### Database Connection
Ensure your production database is accessible from your hosting platform and the connection string is correct.

### Build Errors
If you encounter build errors, make sure all dependencies are properly installed and your TypeScript configuration is correct.

## Troubleshooting

### "Not Found" Error on Redirects
- Check that your database connection is working
- Verify the short code exists in your database
- Ensure environment variables are properly configured

### Database Connection Issues
- Verify your `DATABASE_URL` format
- Check database credentials and permissions
- Ensure the database is accessible from your hosting environment

## License

MIT