module.exports = (app) => {
  const controller = require("../controllers/team.controller");

  var router = require("express").Router();
  //listall
  router.get("/teams", controller.listAll);
  
  //lookups
  router.get("/lookups/:type", controller.lookups);

  router.get("/teams/:teamId", controller.getById);

  // // Create a new Tutorial
  // router.post("/", controller.create);
  //validation
  router.post('/teams', controller.validate('create'), controller.create)

  // Update a Tutorial with id
  router.put("/teams/:teamId", controller.validate('update'), controller.update);

  // Delete a Tutorial with id
  router.delete("/teams/:teamId", controller.delete);

  app.use("/", router);
};
