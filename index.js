const express = require("express");

const app = express();
const server = app.listen(80, () => {
    console.log("Server started");
});

app.use(express.static("static"));
app.use(require("./api/pissapi.js")(server));