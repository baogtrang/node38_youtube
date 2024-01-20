/*AUTHENTICATION*/

// library to create web token: jwt
import jwt from "jsonwebtoken";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

// after a user logs in, this function CREATING A TOKEN
const createToken = (data) => {
  return jwt.sign({ data }, "NODE38", { expiresIn: "1y" });
};

// function to verify TOKEN
const verifyToken = (token) => {
  return jwt.verify(token, "NODE38", (err, decoded) => {
    if (err) {
      //if decoding fails --> error message
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
    // decoding succeeded
    return {
      statusCode: 200,
      data: decoded,
    };
  });
};

// this functiona acts a middleware of AUTHENTICATION
const authenticateToken = async (req, res, next) => {
  let { token } = req.headers;
  // step 1: Check if there's a token in the headers
  if (token) {
    // step 2: verify if the token is correctly formatted
    const tokenVerificationResult = verifyToken(token);

    if (tokenVerificationResult.statusCode == 401) {
      res.status(401).send("Invalid token");
      return;
    }

    let user_id = tokenVerificationResult.data?.user_id;
    console.log(user_id);
    if (!user_id) {
      res.status(401).send("Invalid token");
      return;
    }

    // step 3: check if user_id exists in DB
    let checkUser = await model.users.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!checkUser) {
      res.status(401).send("Invalid token");
      return;
    }
    next(); // if a token is present & valid, this pass the controll to the next handler, i.e. storage.single("file")
  } else {
    res.status(401).send("Unauthorized");
    return;
  }
};

export { createToken, verifyToken, authenticateToken };
