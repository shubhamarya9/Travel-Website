const dotenv = require('dotenv');
const app = require('./app');
const port = 5000;
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database connected successfully');
  });
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
