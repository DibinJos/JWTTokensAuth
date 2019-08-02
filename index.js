const express = require("express");
const app = express();
require("./db/mongoose");

const users = require("./routes/user");
//const auth = require("./auth/auth");

const port = process.env.port || 3000;

//app.use(auth);
app.use(express.json());
app.use(users);

app.listen(port, () => {
  console.log("Server started on", port);
});
