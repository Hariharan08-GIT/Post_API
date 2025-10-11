const express = require('express');
const cors = require('cors');
const PostRoutes = require('./routes/posts');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/posts', PostRoutes);

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
})

