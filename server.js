const express = require('express');

const app = express();

const PORT = 3000 || process.env.POST;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));