const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the Next.js build output directory
app.use(express.static(path.join(__dirname, '.next')));

// Serve the main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/app/page.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
