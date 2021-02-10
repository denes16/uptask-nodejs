const { DataTypes } = require('sequelize');
const db = require('../config/db').instance;
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt');
const Usuarios = db.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Email no válido',
                },
            },
            unique: {
                msg: 'Email ya registrado',
            },
        },
        password: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
    },
    {
        hooks: {
            beforeCreate(usuario) {
                usuario.password = bcrypt.hashSync(usuario.password, 10);
            },
        },
    }
);
Usuarios.hasMany(Proyectos);
module.exports = Usuarios;
