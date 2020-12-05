/** @format */

import express from 'express';

const router = express.Router();

router.post('/api/setup/inital', async (req, res) => {
  res.send({ hej: 'hej' });
});

export { router as initalUserRouter };
