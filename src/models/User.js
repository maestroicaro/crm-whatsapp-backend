const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

User.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

User.beforeUpdate(async (user) => {
  if (user.changed('senha')) {
    user.senha = await bcrypt.hash(user.senha, 10);
  }
});

User.prototype.validarSenha = async function(senhaPlaintext) {
  return bcrypt.compare(senhaPlaintext, this.senha);
};

module.exports = User;
