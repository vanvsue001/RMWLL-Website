const sql = require("../../db.js");

//TODO: fix Team Constructor as well as update & create
//TODO: does listAll need to show coach into. 

// constructor
const Team = function (team) {
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.league_id = team.league_id;
  this.notes = team.notes;
  this.motto = team.motto;
};

Team.checkDuplicateName = (name)=>{
  const dupPromise = new Promise((resolve, reject) => {
    sql.query(`SELECT name FROM teams WHERE name = "${name}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
    if(res.length > 0){
      resolve(false);
    }
    else{
      resolve(true);
    }
    });

  });
  return dupPromise;
}



Team.create = (newTeam, result) => {
  //result(data,err)
  sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
      console.log("created team: ",{id: res.insertId, ...newTeam});
      result({ id: res.insertId, ...newTeam}, null);
    }
  });
};

Team.getById = (id, result) => {
  sql.query(`SELECT * FROM teams WHERE id = ${id}`, (err, res) => {
    //result(data,err)
    if (err) {
      console.log("error: ", err);
      result(null, err)
      return;
    }

    if (res.length) {
      console.log("found team: ", res[0]);
      result(res[0], null);
      return;
    }
    else{
      
      result(null,{ kind: "not_found" });
    }
  });
};

Team.listAll = (sortCol, sortDir, filterCol, filterStr, limit, offset, result) => {
  //SELECT teams.id, teams.name, (concat(people.first_name, ' ', people.last_name)) as full_name, people.email, people.phone, teams.num_players FROM teams INNER JOIN people ON people.id = teams.coach_id 
  let queryString = "SELECT * FROM teams"

  if(limit && offset){
    //SORTING
    queryString += ` LIMIT ${offset},${limit}`
  }
  if(filterCol && filterStr){
    //sql.query(`SELECT * FROM teams_table WHERE CONTAINS(${filterCol}, ${filterStr})`, (err, res) => {
      queryString += ` HAVING ${filterCol} LIKE '%${filterStr}%'`
  }
  if(sortCol && sortDir){
    //SORTING
    queryString += ` ORDER BY ${sortCol}`
    if (sortDir = "dsc"){
      queryString += ` DESC`
    }
    else{
      queryString += ` ASC`
    }
    
  }

  //execute sql query
   sql.query(`${queryString}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    result(res, null);
    console.log("teams: ", res);
    });
 
};

Team.lookups = (type, result) => {
  try{
    let queryString="";
    switch(type){
      case 'coaches':
        queryString = "SELECT CONCAT(first_name, ' ', last_name) as coachName, id as coach_id FROM people WHERE person_type='coach'";
        break;
      case 'players':
        //queryString = "SELECT name as label, id as value FROM teams";
        queryString = "SELECT CONCAT(first_name, ' ', last_name) as playerName, id as player_id FROM people WHERE person_type='player'";
        break;
    }

      //execute sql query
    sql.query(`${queryString}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      else{
        result(res, null);
        console.log(`${type}: `, res);
      }
    });
  }
  catch(err){
    console.log(err.message);
  }

}

Team.updateById = (id, newTeam, result) => {
  sql.query("UPDATE teams SET name = ?, coach_id = ?, league_id =?, notes = ?, motto = ? WHERE id = ?",
    [newTeam.name, newTeam.coach_id,newTeam.league_id, newTeam.notes, newTeam.motto, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team with the id
        result(null, { kind: "not_found"});
        return;
      }
      result({ id , ...newTeam }, null);
      console.log("updated team: ", { id: id, ...newTeam });
    }
  );
};

Team.delete = (id, result) => {
  sql.query("DELETE FROM teams WHERE id = ?", id, (err, res) => {
    //result(data,err)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result(null,{ kind: "not_found" });
      return;
    }
    result(res, null);
    console.log("deleted team with id: ", id);
  });
};


module.exports = Team;
