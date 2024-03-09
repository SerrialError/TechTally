# TechTally

## Tech Stack
Uses:
- React
- NodeJS
- Postgresql

## How to Install

### Part 1: Install Depencies

Install [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) to run the postgres database.
You also have to install [nodejs and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to run the project.
To make a table in the database I would reccomend installing [postgres](https://www.postgresql.org/download/).
Now go to the scouting-app folder and run
```
npm install
```
Then go to the scouting-db folder and run
```
npm install
```
### Part 2: Start the Database and Create a Table

Go to the scouting-db folder then run -
```
docker-compose up -d
```
then run the command -
```
mysql -h localhost -p 5433 -U user -d scouting-db
```
it will then ask you for a password, the password is password.
*FYI: If you want to change the username and password you can edit the docker-compose file.*
Now type in -
```
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS drivetrains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

```
to the console. Now exit the console by typing \d or exit.

### Part 3: Run the Project

Go to the scouting-db folder and run 
```
node server.js
```
Then in a seperate terminal go to the scouting-app folder and run
```
npm run dev
```
Now go to your web browser and type localhost:3000.
