const { DataTypes } = require('sequelize');
const db = require('../config/db').instance;

const slug = require('slug');
const { nanoid } = require('nanoid');

const Proyectos = db.define(
    'proyectos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(30),
        url: DataTypes.STRING(40),
    },
    {
        hooks: {
            beforeCreate(proyecto) {
                console.log('on insert', proyecto.name);
                const url = slug(proyecto.name).toLocaleLowerCase();
                proyecto.url = url + `-${nanoid(10)}`;
            },
        },
    }
);
module.exports = Proyectos;
