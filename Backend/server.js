import app from './app.js';

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
