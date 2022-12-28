const Connection = require("../dbconfig");
const { DataTypes } = require("sequelize");

const dbConnection = Connection.connect;

const Faqs = dbConnection.define(
  "faqs",
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    question: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.TIME,
    },
    updatedAt: {
      type: DataTypes.TIME,
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
    },
    deletedAt: {
      type: DataTypes.TIME,
    },
  },
  {
    freezeTableName: true,
  }
);

dbConnection.sync()

Faqs.create({
  question:'test?',
  answer:'test',
  order:1,
  deleted:false,
  createdAt:new Date(),
  updatedAt:new Date(),
  createdBy:null,
  updatedBy:null,
  deletedBy:null,
  deletedAt:null
}).then((res) => console.log(res.toJSON())).catch((err) => console.log(err))