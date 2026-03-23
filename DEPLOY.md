# Deploy to Vercel

## Quick deploy (3 steps)

### 1. Open Terminal on your Mac and run:

```bash
cd ~/Justin-portfolio/portfolio-nextjs
npm install
npx vercel
```

It will ask you to log in (opens browser), then ask:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- Project name? **justin-portfolio** (or whatever you like)
- Directory? **./** (just press Enter)

### 2. Add environment variables

After the first deploy, go to your Vercel dashboard:
- Open your project settings
- Go to Environment Variables
- Add these two:

```
NEXT_PUBLIC_SUPABASE_URL = https://cgzqnnssbijfpuymnoqe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnenFubnNzYmlqZnB1eW1ub3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjIyODEsImV4cCI6MjA4OTc5ODI4MX0.eUpWahjSdumf7nOLXemgi_Qc6JrXHdR6fPoLfd-0r60
```

### 3. Redeploy

```bash
npx vercel --prod
```

Your site will be live.
