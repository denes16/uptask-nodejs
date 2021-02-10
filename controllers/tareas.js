const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');
const { body, validationResult } = require('express-validator');
const { count } = require('../models/Proyectos');
exports.tareasValidator = [
    body('tarea')
        .not()
        .isEmpty()
        .withMessage('La tarea es necesaria')
        .trim()
        .escape(),
];
exports.postTarea = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const url = req.params.url;
        const proyecto = await Proyectos.findOne({ where: { url } });
        if (!proyecto) {
            res.status(404).json({
                success: false,
                error: { msg: 'Not found' },
            });
            return;
        }
        const tarea = req.body.tarea;
        const proyectoId = proyecto.id;
        console.log(proyecto);
        const r = await Tareas.create({ tarea, status: false, proyectoId });
        res.status(201).json({ success: true, data: r });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.getTareasPorPoryecto = async (req, res) => {
    try {
        const url = req.params.url;
        const proyecto = await Proyectos.findOne({ where: { url } });
        if (!proyecto) {
            res.status(404).json({
                success: false,
                error: { msg: 'Not found' },
            });
            return;
        }
        const tareas = await Tareas.findAll({
            where: { proyectoId: proyecto.id },
        });
        res.json({ success: true, n: tareas.length, data: tareas });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.updateTarea = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status ? true : false;
        const tarea = await Tareas.findOne({ where: { id } });
        if (!tarea) {
            res.status(404).json({
                success: false,
                error: { msg: 'Not found' },
            });
            return;
        }
        tarea.status = status;
        const d = await tarea.save();
        res.json({ success: true, data: d });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tareas.destroy({ where: { id }, limit: 1 });
        if (!tarea) {
            res.status(404).json({ success: false });
            return;
        }
        res.json({ tarea, success: true });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
