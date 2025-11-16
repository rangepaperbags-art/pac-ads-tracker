3. Create a Simple Test API Route
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'degraded',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


4. Build Commands with Proper Sequencing
Update your package.json scripts:

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma db push --force-reset && tsx prisma/seed.ts",
    "db:setup": "prisma generate && prisma db push && tsx prisma/seed.ts",
    "build:safe": "prisma generate && next build"
  }
}


5. Steps to Fix the Build
Run these commands in order:

# 1. Make sure the database schema is up to date
npx prisma generate
npx prisma db push

# 2. Seed the database with mock data
npm run db:seed

# 3. Test the API route
curl http://localhost:3000/api/ads

# 4. Build the application
npm run build:safe

# 5. If build still fails, try building without database
# Create a .env.local file with:
# SKIP_DATABASE_CHECK=true



6. Environment Variable for Build
Create a .env.local file:

# .env.local
DATABASE_URL="file:./dev.db"
SKIP_DATABASE_CHECK=true


Key Fixes:
Robust Error Handling: The API now handles database connection failures gracefully

Fallback Data: Provides mock data when the database is unavailable

Safe JSON Parsing: Handles malformed metadata gracefully

Build-time Safety: API won't fail during build process

Health Check: Added a simple health check endpoint

The build should now succeed even if the database isn't available during the build process, and the application will use fallback data for demonstration purposes.

***************************************************