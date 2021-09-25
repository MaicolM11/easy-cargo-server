const mongoose = require('mongoose');

const uri = 'mongodb+srv://root:root@cluster-compartido.2xyps.mongodb.net/easy-cargo?retryWrites=true&w=majority'

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.log(err));
  