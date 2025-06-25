#!/usr/bin/env node
/**
 * Development server script
 * Serves the public directory and handles path routing
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle bot routes
app.get('/bots/:botName', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/bots', req.params.botName + '.html'));
});

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, '../public')}`);
  console.log(`🤖 Bot routes available at: http://localhost:${PORT}/bots/[botname]`);
});

module.exports = app;