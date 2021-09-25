

const mongoose = require('mongoose');

const uri = 'mongodb+srv://root:root@cluster-compartido.2xyps.mongodb.net/easy-cargo?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(uri, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    });
}

mongoose
  .connect(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
    })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.log(err));
