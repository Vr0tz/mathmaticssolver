# Quick Reference - Gemini API Setup

## Files Changed

1. **`.env.example`** - Template for environment variables (NEW)
2. **`GEMINI_API_SETUP.md`** - Detailed setup guide (NEW)
3. **`README.md`** - Updated with Gemini API instructions
4. **`supabase/functions/analyze-math/index.ts`** - Updated to use Gemini API directly
5. **`src/pages/Index.tsx`** - Updated to call Supabase function with real API

## What's Different Now

### Before (Using Lovable Gateway)
```
❌ Required Lovable API gateway (LOVABLE_API_KEY)
❌ Routed through lovable.dev
❌ Feature was in demo mode
```

### After (Using Gemini API Directly)
```
✅ Direct Gemini API integration
✅ Uses GEMINI_API_KEY from environment
✅ Fully functional with your own API key
✅ Safe to publish on GitHub (keys hidden in env)
```

## One-Time Setup

```bash
# 1. Get API key from https://aistudio.google.com/apikey

# 2. Create .env.local
cp .env.example .env.local

# 3. Add your keys to .env.local
VITE_GEMINI_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here

# 4. Run development server
npm run dev

# 5. Deploy Supabase function
supabase functions deploy analyze-math
```

## Environment Variables

### Development (`.env.local`)
```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Production (Supabase Settings)
```
GEMINI_API_KEY=your_gemini_key
```

### GitHub
✅ **SAFE** - All sensitive keys in `.env.local` which is in `.gitignore`

## Key Security Points

1. `.env.local` is **NOT** committed to GitHub (it's in `.gitignore`)
2. `.env.example` is committed to show what variables are needed
3. Production deployment gets keys via platform settings (Vercel, Supabase, etc.)
4. Users cloning the repo need to set their own keys

## Testing the Integration

1. Open http://localhost:5173
2. Upload a math problem image
3. Click "Analyze Problem"
4. Should see solution with steps

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "GEMINI_API_KEY is not configured" | Set env var in Supabase function settings |
| "Invalid API key" | Verify key in `.env.local` is correct |
| "Rate limit exceeded" | Wait a moment and retry |
| Empty response | Try a clearer math problem image |

## Next Steps

1. ✅ Test locally with your API key
2. ✅ Deploy Supabase function
3. ✅ Test in production
4. ✅ Share on GitHub (keys are safe!)

---

For detailed setup, see `GEMINI_API_SETUP.md`
