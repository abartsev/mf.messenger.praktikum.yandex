const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname + '/src'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
