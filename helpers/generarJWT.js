const jwt = require('jsonwebtoken');

const generarJWT = (uid = '')=>{
    return new Promise((resolve, reject)=>{
        //Guardar el id del usuario
        const payload = {uid};

        //Crear json webtoken firmado
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (error, token)=>{
            if(error){
                console.log(error);
                reject('Error al generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}