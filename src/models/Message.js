const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Contact = require('./Contact');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contactId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Contact,
      key: 'id',
    },
  },
  corpo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    defaultValue: 'entrada',
  },
  midia: {
    type: DataTypes.JSON,
    defaultValue: null,
  },
  lido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

Message.belongsTo(Contact, {
  foreignKey: 'contactId',
  onDelete: 'CASCADE',
});

module.exports = Message;
