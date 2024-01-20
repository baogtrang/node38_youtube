import { Model } from "sequelize";
import { createToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

// library to encode password: bcrypt

const model = initModels(sequelize);

// function handling LOG IN
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // check if email exists in DB
    let data = await model.users.findOne({
      where: {
        email: email,
      },
    });

    // create token if the user exists
    if (data) {
      /* check password
        if correct, create a token
        otherwise, show error
      */
      // compare client password against the encoded password
      // compareSync has 2 params
      // param 1: pw received from request
      // param 2: encoded password
      // return True or False
      let checkPassword = bcrypt.compareSync(password, data.pass_word);

      /*
        base 1: if yes, create token
        library to create a token: jsonwebtoken
        library to encode password: bcrypt
      */
      if (checkPassword) {
        let payload = {
          // testing a fake id
          user_id: data.user_id,
        };
        let token = createToken(payload);
        res.status(200).send(token);
      } else {
        res.status(400).send("Password incorrect");
      }
    } else {
      // case 2: if no, show error
      res.status(404).send("Login fails");
    }
    // res.send({ email, password });
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

// function handling SIGNING UP
const signUp = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    // check if the user exists in the DB
    let data = await model.users.findOne({
      where: {
        email: email,
      },
    });
    // case 1: if the user already exists, send error message
    // case 2: if the user doesn't exist, create a user
    if (data) {
      return res.status(400).send("The user already exists!");
    } else {
      // encode password
      let encodedPassword = bcrypt.hashSync(password, 10);
      let newUser = {
        // must match the column names
        full_name: username,
        email: email,
        pass_word: encodedPassword,
        role: role,
      };
      await model.users.create(newUser);
      return res.status(201).send("User is created");
    }

    res.status(201).send("Signing up succeeded.");
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
};

const loginFacebook = async (req, res) => {
  let { id, name, email } = req.body; // got from FE
  let newData = {
    full_name: name,
    email,
    face_app_id: id,
  };
  // find user based on face_app_id from FE
  let checkUser = await model.users.findOne({
    where: {
      face_app_id: id,
    },
  });
  // if user doesn't exist --> create user in DB --> create token --> return it to FE
  if (!checkUser) {
    await model.users.create(newData);
    // checkUser = model.users.findOne({
    //   where: {
    //     face_app_id: id,
    //   },
    // });
  }
  let token = createToken({ checkEmail: checkUser, pass_word: "" });
  res.send(token);
};

export { login, signUp, loginFacebook };
