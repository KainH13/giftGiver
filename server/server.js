require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// setting up express
const app = express();
const port = 8000;

// enabling cookie parser
app.use(cookieParser());

// enabling cors and json
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json(), express.urlencoded({ extended: true }));

// project specific requirements
require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/card.routes")(app);
require("./routes/comment.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
