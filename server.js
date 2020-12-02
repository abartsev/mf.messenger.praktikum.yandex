const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname + '/src'));

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
