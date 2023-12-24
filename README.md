
# Blogging app API with Node.js

In this project we are going to signup a user and make his blogging profile, add blogs using Node.js, mongoDB and Express.js. this API will use JWT tokens as authentication.
## Installation

install nde modules

```bash
  npm install --y
```
## Install packages required, mentioned in package.json file

```bash
  npm install /*packages*/
```

## paste the link of your MongoDB server

```bash
  configure your mogodb server
```
## Run the project

```bash
  node app.js
```


## Routes

- .get("/",getAllUser);
- .post("/signup", createUser);
- .post("/login" ,loginUser);
- .delete("/delete/:id", loggedInUserOnly,- deleteUser);
- .put("/update/:id", loggedInUserOnly,upadateUser);
