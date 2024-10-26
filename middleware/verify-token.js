/* --------------------------------Imports--------------------------------*/

import jwt from 'jsonwebtoken';

/* --------------------------------Middleware Function--------------------------------*/


const verifyToken = (req, res, next) => {

    try {
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {

        res.status(401).json({ err: "User is not authenticated" });

    }

}

/* --------------------------------Exports--------------------------------*/

export default verifyToken