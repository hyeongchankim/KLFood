const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('L&K Food API is running...');
});

// 로컬: server.js 가 listen. Vercel: api/index.js 가 이 app 을 그대로 핸들러로 export.
module.exports = app;
