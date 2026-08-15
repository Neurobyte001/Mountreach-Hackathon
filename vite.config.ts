import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import {
  enhanceBulletPoint,
  analyzeResumeATS,
  matchJobDescription,
  evaluateInterviewAnswer,
  generateNextInterviewQuestion,
} from './src/server/gemini.ts';

function geminiApiDevPlugin(): Plugin {
  return {
    name: 'gemini-api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/gemini/')) {
          return next();
        }

        const url = req.url.split('?')[0];

        // Parse JSON body
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = body ? JSON.parse(body) : {};
            res.setHeader('Content-Type', 'application/json');

            if (url === '/api/gemini/enhance-bullet') {
              const result = await enhanceBulletPoint(data.originalBullet || '', data.role, data.techStack);
              res.end(JSON.stringify(result));
            } else if (url === '/api/gemini/analyze-resume') {
              const result = await analyzeResumeATS(data.resumeText || '');
              res.end(JSON.stringify(result));
            } else if (url === '/api/gemini/match-jd') {
              const result = await matchJobDescription(data.resumeText || '', data.jobDescription || '');
              res.end(JSON.stringify(result));
            } else if (url === '/api/gemini/interview-question') {
              const result = await generateNextInterviewQuestion(
                data.field || 'ai-ml',
                data.level || 'mid',
                data.type || 'technical',
                data.previousQuestions || []
              );
              res.end(JSON.stringify(result));
            } else if (url === '/api/gemini/evaluate-answer') {
              const result = await evaluateInterviewAnswer(
                data.question || '',
                data.userAnswer || '',
                data.field || 'General',
                data.level || 'mid'
              );
              res.end(JSON.stringify(result));
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Endpoint not found' }));
            }
          } catch (error) {
            console.error('API middleware error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: (error as Error).message }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
