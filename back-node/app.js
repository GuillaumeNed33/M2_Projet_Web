import express from 'express';
import 'body-parser';

import models, { connectDb } from './models';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});