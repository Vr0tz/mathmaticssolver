import { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';
import { SolutionCard } from '@/components/SolutionCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SolutionData {
  detected_problem: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  difficulty_reason: string;
  solution: string;
  steps: { step_number: number; description: string; work: string; explanation: string }[];
  method_name: string;
  method_description: string;
  tips: string[];
  error?: string;
}

const Index = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<SolutionData | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (base64: string) => {
    console.log('handleImageSelect called, base64 length:', base64.length);
    console.log('Setting imageBase64 state');
    setImageBase64(base64);
    setSolution(null);
  };

  const analyzeImage = async () => {
    console.log('analyzeImage called');
    console.log('imageBase64 value:', imageBase64 ? 'has value' : 'null');
    if (!imageBase64) {
      toast({
        title: "No image selected",
        description: "Please upload an image of a math problem first.",
        variant: "destructive",
      });
      return;
    }

    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!geminiApiKey) {
      toast({
        title: "Configuration Error",
        description: "Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env.local file.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSolution(null);

    try {
      let base64Data = imageBase64;
      let mimeType = 'image/jpeg';
      
      if (imageBase64.startsWith('data:')) {
        const parts = imageBase64.split(';');
        mimeType = parts[0].replace('data:', '');
        base64Data = imageBase64.split(',')[1];
      }

      console.log('Sending image to Gemini API...');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            system_instruction: {
              parts: {
                text: `You are an expert math tutor and problem solver. Analyze the math problem in the image and provide a detailed solution.

You must respond with valid JSON in this exact format:
{
  "detected_problem": "The math problem as written in the image",
  "topic": "The mathematical topic (e.g., Algebra, Calculus, Geometry, Trigonometry, Statistics, etc.)",
  "difficulty": "Easy | Medium | Hard | Expert",
  "difficulty_reason": "Brief explanation of why this difficulty level",
  "solution": "The final answer",
  "steps": [
    {
      "step_number": 1,
      "description": "What this step does",
      "work": "The actual mathematical work shown",
      "explanation": "Why we do this step"
    }
  ],
  "method_name": "Name of the mathematical method used (e.g., Quadratic Formula, Integration by Parts, etc.)",
  "method_description": "Brief description of the method and when to use it",
  "tips": ["Helpful tip 1", "Helpful tip 2"]
}

Always respond with valid JSON only, no markdown formatting.`
              }
            },
            contents: {
              role: 'user',
              parts: [
                {
                  text: 'Please analyze this math problem and solve it step by step.'
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          }),
        }
      );

      console.log('Response status:', response.status);
      if (!response.ok) {
        let errorMessage = 'Failed to analyze the image';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorData.error || errorMessage;
          console.error('API Error:', errorData);
        } catch (e) {
          const text = await response.text();
          console.error('API Error (text):', text);
        }
        
        if (response.status === 403) {
          throw new Error('Invalid API key or permission denied. Check your VITE_GEMINI_API_KEY.');
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 400) {
          throw new Error('Bad request: ' + errorMessage);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response:', data);
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        console.error('No content in response:', data);
        throw new Error('No response from AI');
      }

      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      
      const result: SolutionData = JSON.parse(cleanContent.trim());
      
      if (result.error) {
        throw new Error(result.error);
      }

      setSolution(result);
      toast({
        title: "Success",
        description: "Math problem analyzed successfully!",
      });
    } catch (err) {
      console.error('Error analyzing image:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl flex-1">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">AI Math</span>
            <span className="text-foreground"> Solver</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Upload or capture a math problem and get instant solutions with step-by-step explanations
          </p>
        </header>

        <section className="mb-8">
          <ImageUpload 
            onImageSelect={handleImageSelect} 
            isLoading={isLoading}
          />
          
          {imageBase64 && !isLoading && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={analyzeImage}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold px-8"
              >
                <Zap className="w-5 h-5 mr-2" />
                Analyze Problem
              </Button>
            </div>
          )}
        </section>

        {solution && !solution.error && (
          <section>
            <SolutionCard data={solution} />
          </section>
        )}
      </div>

      <footer className="relative z-0 py-6 text-center border-t border-border/30">
        <p className="text-sm text-muted-foreground">
          Made with <span className="text-red-500">❤️</span> vr0tz
        </p>
      </footer>
    </div>
  );
};

export default Index;
