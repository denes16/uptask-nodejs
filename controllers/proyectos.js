const Proyectos = require('../models/Proyectos');
const { body, validationResult } = require('express-validator');
exports.home = (req, res) => {
    res.json({ success: true });
};
exports.postProyectValidators = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('El nombre es ncesario')
        .trim()
        .escape(),
];
exports.postProyect = async (req, res) => {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const d = await Proyectos.create({ name });
        res.status(201).json({ success: true, data: d });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.getProyects = async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll();
        res.json({ success: true, status: 200, data: proyectos });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.getProyect = async (req, res, next) => {
    try {
        const url = req.params.url;
        const proyecto = await Proyectos.findOne({
            where: {
                url,
            },
        });
        if (!proyecto) {
            res.status(404).json({ success: false });
            return next();
        }
        res.json({ success: true, status: 200, data: proyecto });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.putProyect = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return next();
        }
        const id = req.params.id;
        const name = req.body.name;
        const r = await Proyectos.update(
            { name },
            {
                limit: 1,
                where: {
                    id,
                },
                returning: true,
            }
        );
        res.json(r);
    } catch (error) {}
};
exports.deleteProyect = async (req, res, next) => {
    try {
        const id = req.params.id;
        const proyecto = await Proyectos.destroy({ where: { id }, limit: 1 });
        if (!proyecto) {
            res.status(404).json({
                success: false,
                error: { msg: 'Not found' },
            });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
