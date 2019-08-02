const mongoose = require("mongoose");

const users = mongoose.model("UserDetails", {
  id: {
    type: String
  },
  name: {
    type: String
  },
  age: {
    type: Number
  },
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
});

module.exports = users;
