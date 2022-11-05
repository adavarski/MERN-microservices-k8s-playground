import express from 'express';

import { currentUser } from '@arifdev.tickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.user || null });
});

export { router as currentUserRouter };
