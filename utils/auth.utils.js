import User from "../user/user.model.js";
import jwt from "jsonwebtoken";

function validateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(405).send('not auth');
        return
    }

    try {
        const decode = jwt.verify(token, '3de113c0-757c-45be-a5ab-238221699cd2')
        req.user = {
            id: decode.id
        }

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(405).send('Token expirado. Genere un nuevo token')
        }else {
            res.status(405).send('Token no valido')
        }
    }


    //Esta parte del código se modifica por tryCatch  /  jwt.verify
    /*const objectToken = jwt.decode(token, '3de113c0-757c-45be-a5ab-238221699cd2');
    console.log("objectToken ", objectToken);

    if(!objectToken.exp) {
        res.status(405).send('Genere un nuevo token');
        return;
    }
    req.user = {
        id: objectToken.id,
    };

    next();*/
}

async function authAdmin(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(403).send('not auth');
        return;
    }
    
    try {
        const decode = jwt.verify(token, '3de113c0-757c-45be-a5ab-238221699cd2')

        const user = await User.findByPk(objectToken.id);

        if(user.role !== 'ADMIN') {
            res.status(403).send('User is not a admin');
            return;
        }

        req.user = {
            id: objectToken.id,
        };

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(405).send('Token expirado. Genere un nuevo token')
        }else {
            res.status(405).send('Token no valido')
        } 
    }

    //Esta parte del código se maneja con  tryCatch  /  jwt.verify
    /*const objectToken = jwt.decode(token, '3de113c0-757c-45be-a5ab-238221699cd2');

    const user = await User.findByPk(objectToken.id);

    if(user.role !== 'ADMIN') {
        res.status(403).send('User is not a admin');
        return;
    }

    req.user = {
        id: objectToken.id,
    };

    next();*/
}

export {
    authAdmin,
    validateToken 
}