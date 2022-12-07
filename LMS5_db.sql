Use LMS5_teams_SV_09926460051720;

-- PEOPLE TABLE ---------------------------------------------------------------------------------------------------------------------
/*
CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) NOT NULL,
  `team_id` int NOT NULL,
  `email` varchar(128) NOT NULL,
  `phone` varchar(24) NOT NULL,
  `password` varchar(32) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `license_level_id` int NOT NULL,
  `person_type` enum('coach','player','admin') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
*/

-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES ();
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (1, 'SueAnn', 'Van Valkenburg', 6, 'suevan@gmail.com', '253-457-6477', 'UVU4theWIN', 'van107',1, 'player');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (2, 'Lexi', 'Burns', 6, 'lexiBB@gmail.com', '801-666-7777', 'P4ssw0rd', 'feelTheBurns', 1, 'player');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (3, 'Nikki', 'Ballou', 6, 'uvuwlax@yahoo.com', '801-667-0092', '123abc', 'coachN', 5, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (4, 'Jillian', 'Frost', 1, 'boiseState@gmail.com', '208-629-0172', 'ReMeMbER', 'frosty', 3, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (5, 'Elizabeth', 'Belleau', 2, 'AirForceLacrosse@gmail.com', '303-442-5673', 'ReMeMbER', 'airForceCoachEliza', 3, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (6, 'Maggie', 'Lawton', 3, 'maggieSports@yahoo.com', '303-247-8391', 'wclaChamps', 'maggieSports', 2, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (7, 'Katie', 'Sengenberger', 4, 'COMinesGirlsLax@yahoo.com', '720-537-8356', 'coloradoMines720', 'COKatie', 2, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (8, 'Craig', 'Wickstrom', 5, 'northCO@icloud.com', '253-902-7189', 'north2022', 'WickyC', 2, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (9, 'John', 'McCain', 7, 'johhnyLacrosse@gmail.com', '801-462-1918', 'LaxIsLife', 'johhnyLax', 5, 'coach');
-- INSERT INTO people (id, first_name, last_name, team_id, email, phone, password, user_name, license_level_id, person_type) VALUES (10, 'Tayler', 'Kindt', 8, 'cowboyWlax@gmail.com', '307-972-1629', 'CowPi3Lacrosse', 'cowboys', 4, 'coach');
SELECT * FROM people;

-- LEAGUES TABLE ---------------------------------------------------------------------------------------------------------------------
/*
CREATE TABLE `leagues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
*/
-- INSERT INTO leagues (id, name, description) VALUES (1,'RMWLL','WCLA teams in Idaho, Utah, Wyoming and Colorado');
SELECT * FROM leagues;

-- TEAMS TABLE ---------------------------------------------------------------------------------------------------------------------
/*
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(128) DEFAULT NULL,
  `coach_id` int NOT NULL,
  `num_players` int NOT NULL,
  `league_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `coach_id` (`coach_id`),
  KEY `league_id` (`league_id`),
  CONSTRAINT `fk_coach_person` FOREIGN KEY (`coach_id`) REFERENCES `people` (`id`),
  CONSTRAINT `fk_league_team` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
*/

-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES ();


-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (1, 'Boise State', 4, 34, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (2, 'Air Force Academy', 5, 28, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (3, 'University of Denver', 6, 48, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (4, 'Colorado School of Mines', 7, 19, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (5, 'Univ. of Northern Colorado', 8, 22, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (6, 'Utah Valley University', 3, 29, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (7, 'Weber State', 9, 14, 1);
-- INSERT into teams (id, team_name, coach_id, num_players, league_id) VALUES (8, 'University of Wyoming', 10, '18', 1);
SELECT * FROM teams;

-- MOCK DATA -----------------------------------------------------------------------------------------------------------------------
/*
	1, 'Boise State', 'Jillian Frost','(208) 629-0172', 'jFrost@gmail.com','34','images/favicon_drawing.png'
	2,"Air Force Academy","Elizabeth Belleau","(303) 442-5673", "AirForceLacrosse@gmail.com","28","images/favicon_drawing.png"
	3,"University of Denver","Maggie Lawton","(303) 247-8391","maggieSports@yahoo.com", "48","images/favicon_drawing.png"
	4,"Colorado School of Mines","Katie Sengenberger","(720) 537-8356","COMinesGirlsLax@yahoo.com","19","images/favicon_drawing.png"
	5,"Univ. of Northern Colorado","Craig Wickstrom","(253) 902-7189","northCO@icloud.com","22","images/favicon_drawing.png"
	6,"Utah Valley University","Nikki Ballou","(801) 362-8910","uvuwlax@outlook.com","29","images/favicon_drawing.png"
	7,"Weber State","John McCain","(801) 462-1918","johhnyLacrosse@gmail.com","14", "images/favicon_drawing.png"
	8,"University of Wyoming","Tayler Kindt","(307) 972-1629","cowboyWlax@gmail.com","14","images/favicon_drawing.png"
*/

-- SELECT teams.id, teams.team_name, teams.num_players, (concat(people.first_name, " ", people.last_name)) as full_name, people.email, people.phone FROM teams INNER JOIN people ON people.id = teams.coach_id LIMIT 2,3;


