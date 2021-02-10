const { DataTypes } = require('sequelize');
const db = require('../config/db').instance;
const Proyectos = require('./Proyectos');
const Tareas = db.define('tareas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tarea: DataTypes.STRING(50),
    status: DataTypes.BOOLEAN,
});
Tareas.belongsTo(Proyectos);

module.exports = Tareas;
