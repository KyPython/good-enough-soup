import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Security: Disable X-Powered-By header
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

// In-memory storage (MVP v1)
interface Entry {
  id: string;
  date: string;
  text: string;
}

let entries: Entry[] = [];

// GET /entries - Get last 7 entries
app.get('/entries', (req: Request, res: Response) => {
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const last7 = sortedEntries.slice(0, 7);
  res.json(last7);
});

// POST /entries - Add a new entry
app.post('/entries', (req: Request, res: Response) => {
  const { date, text } = req.body;

  if (!date || !text) {
    return res.status(400).json({ error: 'Date and text are required' });
  }

  if (typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text must be a non-empty string' });
  }

  const entry: Entry = {
    id: Date.now().toString(),
    date,
    text: text.trim(),
  };

  entries.push(entry);
  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

