import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/register', async (req: Request, res: Response) => {
  res.send();
});

export { router as registerRouter }
