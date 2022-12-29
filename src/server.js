"use-strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Joi = require("joi");
const dbSetup = require("../dbconfig")
const User = require("../dbconfig/models/user")
dbSetup()

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

  server.route([
    {
      method: "GET",
      path: "/user/{id}",
      options: {
        handler: async (req, h) => {
          try{
            const { id } = req.params;
            const user = await User.query().findById(id)
            return user
          }catch(err){
            console.error(err)
          }          
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
