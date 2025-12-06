# Deploying to Vercel

This guide will help you deploy this math-magic-ai project to Vercel.

## Prerequisites

- GitHub account with your repository pushed
- Vercel account (free tier available at https://vercel.com)
- Supabase project set up with credentials

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings > API**
3. Copy your:
   - **Project URL** (VITE_SUPABASE_URL)
   - **Anon Public Key** (VITE_SUPABASE_PUBLISHABLE_KEY)

## Step 2: Connect to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Visit https://vercel.com/import
2. Select **Import Git Repository**
3. Paste your GitHub repository URL
4. Vercel will auto-detect this as a Vite project

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
cd /home/vr0tz/Downloads/math-magic-ai-main
vercel
```

## Step 3: Set Environment Variables

In Vercel Dashboard:

1. Go to your project **Settings > Environment Variables**
2. Add the following variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your Supabase public key

**Important:** These must be set for all environments (Production, Preview, Development)

## Step 4: Deploy

The project is configured with:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework:** Vite (auto-detected)

The `vercel.json` file contains the configuration. Vercel will:
1. Install dependencies using npm
2. Run the build command
3. Deploy the `dist` folder

## Project Structure

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend Functions:** Supabase Edge Functions
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router DOM

## Post-Deployment

After deployment, your app will be available at:
```
https://your-project.vercel.app
```

### Vercel Domains

- Your first deployment gets a `.vercel.app` domain
- Connect a custom domain in **Project Settings > Domains**

## Troubleshooting

### Build Fails
- Check that `npm run build` works locally
- Verify environment variables are set
- Check build logs in Vercel dashboard

### Blank Page / 404 Errors
- Ensure `dist` folder is being deployed
- Check that routing configuration in `vite.config.ts` is correct
- Verify Supabase credentials are correct

### API Calls Not Working
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are in production environment variables
- Check CORS settings in Supabase
- Verify Supabase functions are deployed

## Local Testing

Before deploying, test the build locally:

```bash
npm install
npm run build
npm run preview
```

Then open `http://localhost:4173` to test the production build.

## Additional Resources

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/deployment.html
- React Router: https://reactrouter.com/
- Supabase: https://supabase.com/docs

---

**Repository Configuration:**
- Framework: Vite + React
- Package Manager: npm
- Build Output: dist/
- Environment Config: vercel.json (included)
