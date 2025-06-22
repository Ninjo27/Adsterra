import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

app.get('/adsterra-callback', async (req, res) => {
  const { adsterra_id, user_id } = req.query;
  if (!adsterra_id || !user_id) {
    return res.status(400).send('Missing parameters');
  }
  const { error } = await supabase
    .from('ad_click_logs')
    .update({ status: 'confirmed' })
    .eq('adsterra_id', adsterra_id)
    .eq('user_id', user_id);

  if (error) return res.status(500).send('DB error');
  res.send('OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
