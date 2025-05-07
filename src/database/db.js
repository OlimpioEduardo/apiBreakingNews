import mongoose from 'mongoose'

const connectDatabase = ()=>{

    console.log('conectando...')
    //  mongoose.connect('mongodb://localhost:27017/breakingNews', {useNewUrlParser: true,  useUnifiedTopology: true}
    
    //)

    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true}
    
    )
    .then(()=> console.log('MongoDb connected'))
    .catch((error)=> console.log(error))
};

export default connectDatabase