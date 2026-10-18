import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint: AI Earning Recommendations
app.post('/api/earning-recommendations', async (req: Request, res: Response) => {
  try {
    const {
      age,
      state,
      areaType,
      education,
      skills,
      budget,
      hoursPerDay,
      equipment,
      preferredMode,
      language = 'hi',
    } = req.body;

    if (!ai) {
      return res.status(200).json({
        source: 'fallback',
        message: 'Running in offline / rule-based mode',
        data: null,
      });
    }

    const systemPrompt = `You are "PaisaHelp AI", an empathetic, hyper-realistic livelihood and earning advisor designed for Indian citizens (students, homemakers, rural youth, low-budget entrepreneurs, informal sector workers).
CRITICAL RULES:
1. NEVER guarantee income, employment, or instant wealth. Provide realistic monthly estimates in Indian Rupees (₹).
2. NEVER suggest gambling, betting apps, color prediction schemes, MLM, binary trading, crypto speculative schemes, or jobs asking for upfront registration fees.
3. Every recommendation must fit the user's REAL constraints (location: ${areaType} in ${state}, starting budget: ${budget}, available hours: ${hoursPerDay}, equipment: ${equipment}).
4. Emphasize verification: teach the user how to avoid scams and verify opportunities.
5. Clearly distinguish between "learning activities" (skills to build) and "earning activities" (actionable work steps).
6. Response language: Generate user-facing text in ${language === 'hi' ? 'Hindi (Devanagari script, natural conversational Hindi with common terms in Devanagari or Hinglish where natural)' : 'English (accessible, clear Indian context)'}.`;

    const userPrompt = `User Profile:
- Age: ${age || 'Not specified'}
- State: ${state || 'India'} (${areaType || 'Semi-Urban'})
- Education: ${education || '12th pass'}
- Key Skills & Interests: ${skills || 'General'}
- Available Starting Budget: ${budget || '₹0 - ₹1,000'}
- Hours available per day: ${hoursPerDay || '3-4 hours'}
- Devices/Equipment available: ${equipment || 'Smartphone with 4G/5G'}
- Preferred earning method: ${preferredMode || 'Any viable method'}

Generate 3 deeply tailored, actionable, realistic earning pathways. For each pathway, provide:
1. title (e.g. "स्थानीय दुकानों के लिए डिजिटल मेनू और सोशल मीडिया सपोर्ट")
2. category ("Digital & Phone", "Local Service", "Home-based / Craft", "Agri & Rural", "Teaching & Tutoring")
3. summary (2 concise sentences)
4. realisticMonthlyRange (e.g. "₹4,000 - ₹12,000 प्रति माह")
5. startupCost (e.g. "₹0 - ₹500")
6. requiredSkills (array of 3-4 skills)
7. stepByStep (array of 4 clear practical steps)
8. potentialChallenges (array of 2-3 genuine hurdles and how to manage them)
9. verificationTips (how to ensure no one scams them in this line of work)
10. sevenDayActionPlan (array of 7 items, day 1 to day 7, with day, title, and type: either "learning" or "earning")`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            disclaimer: {
              type: Type.STRING,
              description: 'Clear statement that income depends on effort and market demand; no earnings are guaranteed.',
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  realisticMonthlyRange: { type: Type.STRING },
                  startupCost: { type: Type.STRING },
                  requiredSkills: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  stepByStep: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  potentialChallenges: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  verificationTips: {
                    type: Type.STRING,
                  },
                  sevenDayActionPlan: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        day: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        type: {
                          type: Type.STRING,
                          description: 'Must be either "learning" or "earning"',
                        },
                      },
                      required: ['day', 'title', 'description', 'type'],
                    },
                  },
                },
                required: [
                  'id',
                  'title',
                  'category',
                  'summary',
                  'realisticMonthlyRange',
                  'startupCost',
                  'requiredSkills',
                  'stepByStep',
                  'potentialChallenges',
                  'verificationTips',
                  'sevenDayActionPlan',
                ],
              },
            },
          },
          required: ['disclaimer', 'recommendations'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ source: 'ai', data: parsedData });
  } catch (error: any) {
    console.error('Error generating earning recommendations:', error);
    return res.status(200).json({
      source: 'fallback',
      error: error?.message || 'AI generation failed',
      data: null,
    });
  }
});

// Endpoint: AI Business Ideas Generator
app.post('/api/business-ideas', async (req: Request, res: Response) => {
  try {
    const { budget, skills, location, timeAvailable, language = 'hi' } = req.body;

    if (!ai) {
      return res.status(200).json({
        source: 'fallback',
        message: 'Running in offline / rule-based mode',
        data: null,
      });
    }

    const systemPrompt = `You are "PaisaHelp AI", a realistic small-business advisor for micro-entrepreneurs in India.
Focus on low-risk, high-demand, low-capital ventures suitable for local Indian markets.
Never promise unrealistic riches. Always specify real startup costs, required equipment, validation steps, and key risks.
Response language: ${language === 'hi' ? 'Hindi (Devanagari script, simple and clear)' : 'English (approachable, Indian context)'}.`;

    const userPrompt = `Generate 3 realistic small business ideas based on:
- Budget: ${budget || 'Under ₹5,000'}
- Skills/Interest: ${skills || 'Any'}
- Location: ${location || 'Small Town / Rural'}
- Time commitment: ${timeAvailable || 'Full time'}

Provide structured business profiles including:
- id
- name
- tag
- investmentRange
- profitMargin
- breakdownOfCosts (array of item and approx cost)
- requiredResources (equipment, raw materials)
- demandValidation (how to test customer demand before spending a rupee)
- businessRisks (honest risks and mitigation)
- licenseNeeded (e.g. Udyam MSME free registration, FSSAI basic if food)
- firstMonthRoadmap (4 weekly milestone bullets)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  tag: { type: Type.STRING },
                  investmentRange: { type: Type.STRING },
                  profitMargin: { type: Type.STRING },
                  breakdownOfCosts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        item: { type: Type.STRING },
                        cost: { type: Type.STRING },
                      },
                      required: ['item', 'cost'],
                    },
                  },
                  requiredResources: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  demandValidation: { type: Type.STRING },
                  businessRisks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  licenseNeeded: { type: Type.STRING },
                  firstMonthRoadmap: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: [
                  'id',
                  'name',
                  'tag',
                  'investmentRange',
                  'profitMargin',
                  'breakdownOfCosts',
                  'requiredResources',
                  'demandValidation',
                  'businessRisks',
                  'licenseNeeded',
                  'firstMonthRoadmap',
                ],
              },
            },
          },
          required: ['ideas'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ source: 'ai', data: parsedData });
  } catch (error: any) {
    console.error('Error generating business ideas:', error);
    return res.status(200).json({
      source: 'fallback',
      error: error?.message || 'AI generation failed',
      data: null,
    });
  }
});

// Endpoint: Scam & Fraud Checker
app.post('/api/check-scam', async (req: Request, res: Response) => {
  try {
    const { text, language = 'hi' } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ai) {
      // Heuristic analyzer for offline mode
      const lower = text.toLowerCase();
      let riskScore = 'Low';
      const redFlags: string[] = [];

      if (
        lower.includes('telegram') ||
        lower.includes('registration fee') ||
        lower.includes('security deposit') ||
        lower.includes('रजिस्ट्रेशन फीस') ||
        lower.includes('सिक्योरिटी') ||
        lower.includes('like youtube') ||
        lower.includes('hotel review') ||
        lower.includes('otp') ||
        lower.includes('pin') ||
        lower.includes('daily 3000') ||
        lower.includes('guaranteed return') ||
        lower.includes('पक्का रिटर्न')
      ) {
        riskScore = 'High';
        if (lower.includes('telegram')) redFlags.push('अनजान टेलीग्राम ग्रुप में ट्रांसफर करना (Redirecting to Telegram)');
        if (lower.includes('registration') || lower.includes('फीस') || lower.includes('deposit')) redFlags.push('काम देने के बदले पैसे/फीस मांगना (Asking upfront payment)');
        if (lower.includes('like') || lower.includes('review')) redFlags.push('यूट्यूब लाइक / रेटिंग टास्क फ्रॉड (Review/Like task scam)');
        if (lower.includes('otp') || lower.includes('pin')) redFlags.push('ओटीपी या पिन मांगना (Crucial security risk: Asking for OTP/PIN)');
        if (lower.includes('guaranteed') || lower.includes('पक्का')) redFlags.push('अवास्तविक बिना मेहनत की कमाई का वादा (Unrealistic guaranteed returns)');
      }

      return res.json({
        source: 'heuristic',
        data: {
          riskScore,
          isLikelyScam: riskScore === 'High',
          explanation: language === 'hi' 
            ? 'इस संदेश में आम ऑनलाइन फ्रॉड के लक्षण पाए गए हैं। वास्तविक कंपनियाँ काम देने के लिए कभी रजिस्ट्रेशन फीस या सिक्यूरिटी डिपॉजिट नहीं मांगतीं।'
            : 'This message exhibits typical online scam patterns. Legitimate organizations never charge money to offer work.',
          redFlags: redFlags.length > 0 ? redFlags : ['अज्ञात प्रेषक या संदिग्ध ऑफर'],
          recommendedAction: language === 'hi'
            ? 'कोई पैसा न भेजें, कोई ओटीपी साझा न करें। यदि संदिग्ध है तो राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें।'
            : 'Do not pay any money. Do not share OTPs. If threatened or defrauded, report immediately to Cyber Crime Helpline 1930.',
        },
      });
    }

    const systemPrompt = `You are a Cyber Safety and Financial Fraud Detector specialized in Indian scams:
- Part-time Telegram task scams ("Like YouTube videos and earn ₹5000/day")
- Upfront registration fee / training fee scams ("Pay ₹499 for ID card")
- 7-day illegal loan apps blackmailing contacts
- Fake work from home / typing / captcha scams
- WhatsApp OTP theft & QR code scan tricks ("Scan to receive money")
- Fake government subsidies or PM schemes demanding processing fees

Evaluate the user's provided text and respond in ${language === 'hi' ? 'Hindi' : 'English'}.
Risk levels: "Safe", "Suspicious / Moderate", "High Risk / Confirmed Scam Pattern".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Analyze this job offer / message for fraud:\n"${text}"`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              description: 'One of: Safe, Moderate Risk, High Risk (Scam Alert)',
            },
            isLikelyScam: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            recommendedAction: { type: Type.STRING },
            goldenRule: { type: Type.STRING },
          },
          required: [
            'riskLevel',
            'isLikelyScam',
            'explanation',
            'redFlags',
            'recommendedAction',
            'goldenRule',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ source: 'ai', data: parsedData });
  } catch (error: any) {
    console.error('Error checking scam with AI, falling back to heuristic:', error);
    const textStr = req.body?.text || '';
    const lang = req.body?.language || 'hi';
    const lower = textStr.toLowerCase();
    const isSuspicious =
      lower.includes('telegram') ||
      lower.includes('registration fee') ||
      lower.includes('security deposit') ||
      lower.includes('fee') ||
      lower.includes('फीस') ||
      lower.includes('लाइक') ||
      lower.includes('like') ||
      lower.includes('otp') ||
      lower.includes('pin') ||
      lower.includes('qr') ||
      lower.includes('loan') ||
      lower.includes('लोन') ||
      lower.includes('3000') ||
      lower.includes('5000') ||
      lower.includes('guaranteed');

    return res.status(200).json({
      source: 'fallback',
      data: {
        riskLevel: isSuspicious ? 'High Risk (Scam Alert)' : 'Moderate Risk',
        isLikelyScam: isSuspicious,
        explanation: lang === 'hi'
          ? (isSuspicious
              ? 'इस संदेश में ऑनलाइन फ्रॉड के लक्षण हैं। असली कंपनियाँ कभी काम देने के बदले फीस नहीं मांगतीं।'
              : 'अज्ञात प्रेषक से आए किसी भी ऑफर पर भरोसा करने से पहले सतर्क रहें।')
          : (isSuspicious
              ? 'This message displays classic fraud patterns such as advance fees or unverified channels.'
              : 'Exercise extreme caution when dealing with unverified job offers or online loan texts.'),
        redFlags: isSuspicious
          ? [
              lang === 'hi' ? 'नौकरी/काम के लिए अग्रिम पैसे या फीस मांगना' : 'Demanding upfront deposit or registration fee',
              lang === 'hi' ? 'अज्ञात टेलीग्राम चैनल या व्हाट्सऐप पर संपर्क' : 'Redirecting to unknown Telegram/WhatsApp groups',
              lang === 'hi' ? 'बिना योग्यता के अवास्तविक दैनिक कमाई का वादा' : 'Unrealistic high daily income promises',
            ]
          : [lang === 'hi' ? 'अपुष्ट स्रोत से प्राप्त संदेश' : 'Unverified source message'],
        recommendedAction: lang === 'hi'
          ? 'कोई पैसा न भेजें। किसी को ओटीपी या यूपीआई पिन न दें। नंबर तुरंत ब्लॉक करें।'
          : 'Do not pay any money. Never share your OTP or UPI PIN. Block the sender.',
        goldenRule: lang === 'hi'
          ? 'नौकरी पाने के लिए कभी पैसे मत दें!'
          : 'Never pay money to get a job!',
      },
    });
  }
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'PaisaHelp AI',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite Middleware in Dev or serve static in Prod
async function startServer() {
  const portArgIndex = process.argv.indexOf('--port');
  const portArg = portArgIndex !== -1 ? process.argv[portArgIndex + 1] : undefined;
  const PORT = Number(portArg) || Number(process.env.PORT) || 3000;

  const isProd =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.K_SERVICE) ||
    fs.existsSync(path.resolve(__dirname, 'dist', 'index.html'));

  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`  VITE v8.3.4  ready in 150 ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
  });
}

startServer();
