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
- Add your Neon Postgres connection string (this project uses Neon Postgres, not Supabase):

```
POSTGRES_URL = your-neon-postgres-connection-string
```

### 3. Redeploy

```bash
npx vercel --prod
```

Your site will be live.
