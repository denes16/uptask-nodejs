const { Sequelize } = require('sequelize');
const env = require('./index');
module.exports = class DB {
    constructor() {
        this.cnn = new Sequelize(
            env.db.database,
            env.db.user,
            env.db.password,
            {
                host: env.db,
                dialect: 'mysql',
                pool: {
                    min: 0,
                    max: 5,
                    acquire: 30000,
                    idle: 10000,
                },
            }
        );
    }
    connect() {
        this.cnn.sync();
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance.cnn;
    }
};
