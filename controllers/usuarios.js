const Usuarios = require('../models/Usuarios');
const { body, validationResult } = require('express-validator');
exports.postUsuarioValidator = [
    body('email').isEmail(),
    body('password').isLength(6).withMessage('Contraseña inválida'),
];
exports.postUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const usuario = await Usuarios.create({ email, password });
        res.json({ success: true, data: usuario });
    } catch (error) {
        // console.log(error);
        if (error.errors) {
            const errors = [];
            for (const e of error.errors) {
                const er = {
                    msg: e.message,
                };
                errors.push(er);
            }
            res.status(400).json({ success: false, errors });
            return;
        }
        res.status(500).json({ success: false });
    }
};
