const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const RolePermission = sequelize.define('RolePermission', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'roles', key: 'id'}
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'permisos', key: 'id'}
    }
},{
    timestamps: false,
    tableName: 'roles_permisos',
    indexes: [
        {
            unique: true,
            fields: ['rol_id', 'permiso_id']
        }
    ]
});

module.exports = RolePermission;