const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mycrudapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Item = mongoose.model('Item', ItemSchema);

app.post('/api/items', (req, res) => {
  const newItem = new Item(req.body);
  return newItem.save();
});

app.get('/api/items/server', async(req, res) => {
  res.send('Request Handled from server 1.')
})

app.get('/api/items', async(req, res) => {
    try {
        const result = await Item.find();
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
  
});

app.delete('/api/items/:id', async(req, res) => {
    
    const {id} = req.params;
    try{
        const item = await Item.findByIdAndDelete({_id: id});
        res.send('Item successfully deleted!!')
    } catch (error) {
        res.status(500).send(err)
    }
    
    
})

// Implement update and delete routes similarly...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
