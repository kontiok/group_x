const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const student = require('../models/student_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.id_student && request.body.password){
      const id_student = request.body.id_student;
      const password = request.body.password;
        student.checkPassword(id_student, function(dbError, dbResult) {
          if(dbError){
            response.json(dbError);
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(password,dbResult[0].password, function(err,compareResult) {
                if(compareResult) {
                  console.log("success");
                  const token = generateAccessToken({ username: id_student });
                  response.send(token);
                }
                else {
                    console.log("wrong password");
                    response.send(false);
                }			
              }
              );
            }
            else{
              console.log("user does not exists");
              response.send(false);
            }
          }
          }
        );
      }
    else{
      console.log("id_student or password missing");
      response.send(false);
    }
  }
);

function generateAccessToken(username) {
    dotenv.config();
    return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;