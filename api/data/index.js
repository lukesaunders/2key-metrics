import express from 'express'
import loadLinkClickthroughs from '../../data/link_clickthroughs';

const app = express();

app.all('/link_clickthroughs', async (req, res) => {
  const list = await loadLinkClickthroughs(req.query);
  res.json(list);
});

module.exports = {
  path: '/api/data/',
  handler: app
};
