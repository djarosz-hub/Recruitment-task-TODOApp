const express = require('express');
const { port } = require('./config');
const cors = require('cors');
const apiRouter = require('./routes/Api');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', apiRouter);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
