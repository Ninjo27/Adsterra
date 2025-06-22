const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ibylievcmlzzyzkihzfo.supabase.co'; // Thay bằng project của bạn
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlieWxpZXZjbWx6enl6a2loemZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTQ4OTYsImV4cCI6MjA2NTM3MDg5Nn0.iJNGvjly4q5M43Xd5uJ8A0OZT7PSrbQWcuhas9WWEiM'; // Lấy từ Supabase Project Settings

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

app.get('/adsterra-callback', async (req, res) => {
  const { adsterra_id, user_id } = req.query;
  if (!adsterra_id || !user_id) {
    return res.status(400).send('Missing parameters');
  }

  // Update trạng thái click trong bảng ad_click_logs
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
