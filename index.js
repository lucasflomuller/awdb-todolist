const express = require('express'),
      app = express(),
      PORT = process.env.PORT || '8080',
      IP = process.env.IP || '0.0.0.0',
      bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, IP, () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});
