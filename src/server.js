"use-strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Connection = require('../dbconfig')
const path = require("path")


const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  await server.register([
    {
      plugin: require("hapi-geo-locate"),
      options: {
        enabledByDefault: true
      },
    },
    {
      plugin: Inert
    },
    {
      plugin: Vision
    },
  ]);

  server.views({
    engines:{
        html:require('handlebars')
    },
    path: path.join(__dirname,'../views' )
  })

  /* server.route(routes); */
  server.route([
    {
        method:'GET',
        path:'/getData',
        handler: async (req, h) => {
            const dbConnection = await Connection.connect
            return h.view('index', data)
        }
    },
    {
        method:'GET',
        path:'/dynamic',
        handler:(req, h) => {
            const data = {
                name:'wt'
            }
            return h.view('index', data)
        }
    }
  ])

  await server.start();
  console.log(`server running on %s`, server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
