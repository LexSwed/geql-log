import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  res.json(req.body);
};

export default handler;
