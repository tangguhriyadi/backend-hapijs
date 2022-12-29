"use-strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Joi = require("joi");
const { connect } = require("../dbconfig");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      cors: true,
    },
  });

  const swaggerOptions = {
    info: {
      title: "Test API Docs",
      version: "123",
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  connect
    .authenticate()
    .then(() => console.log("connected to Database"))
    .catch((err) => console.log(err));

  server.route([
    {
      method: "GET",
      path: "/faqs",
      options: {
        handler: async (req, h) => {
          const [result] = await connect.query("SELECT * FROM faqs WHERE deleted=false");
          return result;
        },
        description: "Get All Faqs",
        notes: "get faqs",
        tags: ["api"], // ADD THIS TAG
      },
    },
    {
      method: "GET",
      path: "/faqs/{id}",
      options: {
        handler: async (req, h) => {
          const { id } = req.params;
          const [result] = await connect.query(
            `SELECT * FROM faqs WHERE deleted=false AND id=${id}`
          );
          return result[0];
        },
        description: "Get Faqs by Id",
        notes: "get faqs",
        tags: ["api"], // ADD THIS TAG
        validate: {
          params: Joi.object({
            id: Joi.number().required().description("the id"),
          }),
        },
      },
    },
    {
      method: "POST",
      path: "/faqs",
      options: {
        handler: async (req, h) => {
          console.log(req.payload)
          
          /* const [result] = await connect.query(
            `INSERT INTO faqs () 
            VALUES ()`
          );
          return result; */
          return "test"
        },
        description: "Create Faqs",
        notes: "get faqs",
        tags: ["api"], // ADD THIS TAG
        plugins: {
          "hapi-swagger": {
            payloadType: "form",
          },
        },
        validate: {
          payload: Joi.object({
            question: Joi.string().required('mandatory'),
            answer: Joi.string().required('mandatory'),
            order:Joi.number(),
            deleted:Joi.boolean(),
            createdAt:Joi.number(),
            updatedAt:Joi.number(),
            createdBy:Joi.number(),
            updatedBy:Joi.number(),
            deletedBy:Joi.number(),
            deletedAt:Joi.number()
          }),
        },
      },
    },
    {
      method: "PUT",
      path: "/faqs/{id}",
      options: {
        handler: async (req, h) => {
          console.log(req.payload)
          
          const [result] = await connect.query(
            `UPDATE faqs SET`
          );
          return "test"
        },
        description: "Edit Faqs",
        notes: "get faqs",
        tags: ["api"], // ADD THIS TAG
        plugins: {
          "hapi-swagger": {
            payloadType: "form",
          },
        },
        validate: {
          payload: Joi.object({
            question: Joi.string().required('mandatory'),
            answer: Joi.string().required('mandatory'),
            order:Joi.number(),
            deleted:Joi.boolean(),
            createdAt:Joi.number(),
            updatedAt:Joi.number(),
            createdBy:Joi.number(),
            updatedBy:Joi.number(),
            deletedBy:Joi.number(),
            deletedAt:Joi.number()
          }),
        },
      },
    },
    {
      method: "DELETE",
      path: "/faqs/{id}",
      options: {
        handler: async (req, h) => {
          const { id } = req.params;
          const [result] = await connect.query(
            `DELETE FROM faqs WHERE id=${id}`
          );
          return result;
        },
        description: "Delete Faqs",
        notes: "get faqs",
        tags: ["api"], // ADD THIS TAG
        validate: {
          params: Joi.object({
            id: Joi.number().required().description("the id"),
          }),
        },
      },
    },
  ]);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
