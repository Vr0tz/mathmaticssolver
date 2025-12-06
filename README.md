# 🧮 AI Math Solver

An intelligent math problem solver powered by Google's Gemini API. Upload or capture a math problem and get instant step-by-step solutions with detailed explanations.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Gemini API](https://img.shields.io/badge/Gemini%20API-Latest-orange)

## ✨ Features

- 📸 **Image Upload & Capture**: Upload math problems directly or capture them with your camera
- 🤖 **AI-Powered Analysis**: Uses Google Gemini API for accurate math problem solving
- 📊 **Detailed Solutions**: Get step-by-step explanations with mathematical methods
- 🎯 **Difficulty Classification**: Problems are automatically categorized by difficulty
- 💡 **Learning Tips**: Helpful tips and method descriptions for better understanding
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS and shadcn/ui
- ⚡ **Fast & Lightweight**: Built with Vite for instant hot reload and optimized builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- A Google Gemini API key ([free tier available](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vr0tz/mathmaticssolver.git
   cd mathmaticssolver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your Gemini API key to `.env.local`**
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Getting Your Gemini API Key

### Step 1: Visit Google AI Studio
Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### Step 2: Create an API Key
1. Click **"Create API Key"**
2. Select your project (or create a new one)
3. Copy the generated API key

### Step 3: Add to Project
1. Open `.env.local` in your project
2. Paste your key:
   ```
   VITE_GEMINI_API_KEY=your_copied_key_here
   ```

### Step 4: Save & Restart
Save the file and restart your dev server for changes to take effect.

## 📖 How to Use

### Upload a Math Problem

1. **Open the app** at http://localhost:5173
2. **Upload an image** by:
   - Clicking "Upload Math Problem" and selecting a file
   - Dragging & dropping an image onto the upload area
3. **Click "Analyze Problem"** button
4. **Wait for results** - the AI will analyze and provide:
   - Detected problem statement
   - Mathematical topic
   - Difficulty level
   - Step-by-step solution
   - Method explanation
   - Helpful tips

### Capture with Camera

1. **Click the camera icon** in the upload area
2. **Take a photo** of your math problem
3. **Confirm the photo**
4. **Click "Analyze Problem"**
5. **Get your solution!**

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── Index.tsx           # Main application page
│   └── NotFound.tsx        # 404 page
├── components/
│   ├── ImageUpload.tsx     # Image upload handler
│   ├── CameraCapture.tsx   # Camera capture component
│   ├── SolutionCard.tsx    # Solution display component
│   ├── DifficultyBadge.tsx # Difficulty indicator
│   └── ui/                 # shadcn-ui components
├── hooks/
│   └── use-toast.ts        # Toast notifications
├── lib/
│   └── utils.ts            # Utility functions
└── App.tsx                 # Main app component

public/
├── robots.txt              # SEO robots file
```

## 🎨 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn-ui + Radix UI
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini API
- **State Management**: React Hooks
- **HTTP Client**: Fetch API

## 🔒 Security

- API keys are stored in `.env.local` (never committed to git)
- `.env.local` is in `.gitignore`
- `.env.example` shows the required variables without sensitive data
- All API calls are made from the client-side

### Important: Keep Your API Key Secret
- **Never commit `.env.local` to GitHub**
- **Never share your API key publicly**
- **Regenerate your key if accidentally exposed**

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "mathmaticssolver"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your API key
   - Deploy!

### Deploy to Netlify

1. **Push to GitHub**
2. **Connect to Netlify**
   - Go to [https://netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   
3. **Add Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add `VITE_GEMINI_API_KEY`

4. **Deploy**

## 📊 API Response Format

The Gemini API returns solutions in this format:

```json
{
  "detected_problem": "2x + 5 = 13",
  "topic": "Linear Equations",
  "difficulty": "Easy",
  "difficulty_reason": "This is a basic linear equation",
  "solution": "x = 4",
  "steps": [
    {
      "step_number": 1,
      "description": "Start with equation",
      "work": "2x + 5 = 13",
      "explanation": "Given equation"
    }
  ],
  "method_name": "Algebraic Manipulation",
  "method_description": "Using inverse operations",
  "tips": ["Always perform same operation on both sides"]
}
```

## ⚡ Performance Tips

- **Cache images**: Browser caches uploaded images automatically
- **Optimize images**: Use compressed images for faster uploads
- **Clear cache**: If experiencing issues, clear browser cache (Ctrl+Shift+Delete)

## 🐛 Troubleshooting

### "API key not found"
- Make sure `.env.local` exists in the project root
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Restart the dev server (`npm run dev`)

### "Invalid API key"
- Check your key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- Make sure it's the correct key (copy the full key)
- Regenerate if necessary

### "Rate limit exceeded"
- Google free tier has limits (60 requests/minute)
- Wait a moment and try again
- Upgrade to paid tier for higher limits

### Image not recognized
- Try a clearer, well-lit photo
- Ensure the entire problem is visible
- Try a different image format (JPG, PNG)

### Port 5173 already in use
```bash
# Kill the process using the port
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | `AIza...` |

See `.env.example` for reference.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - AI powering the solutions
- [shadcn-ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section above
2. Review [Google Gemini API docs](https://ai.google.dev/)
3. Open an issue on GitHub

---

**Made with ❤️ by vr0tz**

Happy solving! 🧮✨
