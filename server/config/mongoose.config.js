const mongoose = require("mongoose");

const db = "giftGiverDB";

mongoose
    .connect(`mongodb://localhost/${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Established a connection to the database: ${db}`))
    .catch((err) =>
        console.log(`Something went wrong when connecting to ${db}`, err)
    );
