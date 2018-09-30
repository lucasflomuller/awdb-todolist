const express = require('express'),
      app = express(),
      PORT = process.env.PORT || '8080',
      IP = process.env.IP || '0.0.0.0';

app.get('/', (req, res) => {
  res.send("HI THERE")
});

app.listen(PORT, IP, () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});