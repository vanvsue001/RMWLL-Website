const Team = require("../models/team.model");


const { validationResult } = require('express-validator/check');
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  try{
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    // Create a Team
    const newTeam = new Team({
      //no id
      name : req.body.name,
      coach_id : req.body.coach_id,
      league_id :req.body.league_id,
      notes : req.body.notes,
      motto: req.body.motto

    });

    Team.create(newTeam, (data, err) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Team.",
        });
      else {
        res.status(201).send(data);
        //res.send(data);
      } 
    })

  }
  catch(err){
    return next(err)
  }

  
};

//validator
const { body } = require('express-validator/check')

exports.validate = (method) => {
  const rules = [ 
    body('name','team name cannot be empty').not().isEmpty().trim().escape(),
    body('coach_id','coach id cannot be empty').not().isEmpty().trim().escape(),
    body('league_id','league id cannot be empty').not().isEmpty().trim().escape(),
    body('notes','notes cannot be empty').not().isEmpty().trim().escape(),
    body('motto','motto cannot be empty').not().isEmpty().trim().escape(),
   

    body('name', "invalid team name").matches(/^[A-Za-z0-9-\s]+$/),
 

   ]   
  switch (method) {
    case 'create': {
      rules.push(  body('name', 'duplicate Team Name').custom( (value) => { 
       
        return Team.checkDuplicateName(value).then( teamName=>{
          if(!teamName){
            return Promise.reject("duplicate team name")
          }
        })
         
        }))
      return rules
    }
    case 'update': {
      return rules
     }
  }
}

exports.listAll = (req, res) => {
  Team.listAll(req.query.sortCol, req.query.sortDir, req.query.filterCol, req.query.filterStr, req.query.limit, req.query.offset,(data, err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teams.",
      });
    else res.send(data);
    console.log("------------------")
    console.log(req.query.sortCol, req.query.sortDir);
  });
};

//lookup
exports.lookups = (req, res) => {
  Team.lookups(req.params.type, (data, err) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coaches.",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  Team.getById(req.params.teamId, (data, err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No found Team with id ${req.params.teamId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Team with id " + req.params.teamId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  try{
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }


    Team.updateById(req.params.teamId, new Team(req.body), (data, err) => {

      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Team with id ${req.params.teamId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Team with id " + req.params.teamId,
          });
        }
      } else res.send(data);
    });
  }
  catch(err){
    return next(err)
  }
};

exports.delete = (req, res) => {
  Team.delete(req.params.teamId, (data, err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.teamId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Team with id " + req.params.teamId,
        });
      }
    } else res.send({ message: `Team was deleted successfully!` });
  });
};
