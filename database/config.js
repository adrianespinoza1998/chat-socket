const moongose = require('mongoose');

const dbConnection = async ()=>{
    try {
        //Conectarse a mongo atlas
        await moongose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}

module.exports = {
    dbConnection
}