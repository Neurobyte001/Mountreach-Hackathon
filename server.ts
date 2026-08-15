import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  enhanceBulletPoint,
  analyzeResumeATS,
  matchJobDescription,
  evaluateInterviewAnswer,
  generateNextInterviewQuestion,
} from './src/server/gemini.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// API Routes
app.post('/api/gemini/enhance-bullet', async (req, res) => {
  try {
    const { originalBullet, role, techStack } = req.body;
    const result = await enhanceBulletPoint(originalBullet || '', role, techStack);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/gemini/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    const result = await analyzeResumeATS(resumeText || '');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/gemini/match-jd', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const result = await matchJobDescription(resumeText || '', jobDescription || '');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/gemini/interview-question', async (req, res) => {
  try {
    const { field, level, type, previousQuestions } = req.body;
    const result = await generateNextInterviewQuestion(field, level, type, previousQuestions || []);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/gemini/evaluate-answer', async (req, res) => {
  try {
    const { question, userAnswer, field, level } = req.body;
    const result = await evaluateInterviewAnswer(question, userAnswer, field, level);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Static assets in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`CareerForge server running on port ${port}`);
});
