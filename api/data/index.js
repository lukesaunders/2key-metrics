import express from 'express'
import loadLinkClickthroughs from '../../data/link_clickthroughs';
import loadUserRegistrations from '../../data/user_registrations';

const app = express();

app.all('/link_clickthroughs', async (req, res) => {
  const list = await loadLinkClickthroughs(req.query);
  res.json(list);
});

app.all('/user_registrations', async (req, res) => {
  const list = await loadUserRegistrations(req.query);
  res.json(list);
});

module.exports = {
  path: '/api/data/',
  handler: app
};
