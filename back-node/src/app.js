import express from 'express';
import 'body-parser';

import models, { connectDb } from './models';

const app = express();
const routes = require('./routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routes);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});