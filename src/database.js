const mongoose = require('mongoose');

/*
if(process.env.ROLE == "DEV") {
  uri = 'mongodb+srv://root:root@cluster-compartido.2xyps.mongodb.net/easy-cargo?retryWrites=true&w=majority'
} else{
  uri = 'mongodb+srv://root:root@cluster-compartido.2xyps.mongodb.net/easy-cargo-test?retryWrites=true&w=majority'
}*/
let uri = 'mongodb+srv://root:root@cluster-compartido.2xyps.mongodb.net/easy-cargo?retryWrites=true&w=majority'

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.log(err));
  