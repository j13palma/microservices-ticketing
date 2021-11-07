import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;
  res.send({}); // send empty object to indicate success
});

export { router as signoutRouter };
