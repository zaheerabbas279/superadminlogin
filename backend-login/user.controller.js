const express = require("express");
const db = require("./db");
const nodemailer = require("nodemailer");
const { sendMail } = require("./mail.service");

const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createDatabase = async (dbName) => {
  try {
    let sql = `CREATE DATABASE ${dbName}`;
    // create database
    const createDatabaseResp = await dbQuery(sql);

    // create table
    let sqlToCreateTable = `CREATE TABLE ${dbName}.users (userId INT PRIMARY KEY AUTO_INCREMENT,userName VARCHAR(20),email VARCHAR(30),password VARCHAR(30), role INT(10))`;
    const createTable = await dbQuery(sqlToCreateTable);
  } catch (error) {
    throw error;
  }
};

// function to create a subadmin
const createSubAdmin = async (params) => {
  try {
    // *query to insert into organization.users

    let sql = `INSERT INTO ${params.organization}.users (userName, email, password, role) VALUES("${params.userName}","${params.email}", "${params.password}", ${params.role})`;
    const subAdminCreate = await dbQuery(sql);
    await sendMail(params.email, {
      organization: params.organization,
      detials: { userName: params.email, password: params.password },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser: (req, res, next) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let sql = `SELECT * from users WHERE email = ? AND password = ?`;

      db.query(sql, [email, password], (err, resp) => {
        if (err) {
          res.send({ status: false, message: "Error login user" });
        }

        // res.send({status:true, message:"user logged in successfully"})

        db.query(`SELECT * FROM users WHERE email = ?`, email, (err, resp) => {
          if (err) {
            res.send({ status: false, message: "error finding the user" });
          }

          res.send({ status: true, message: "Logged in ", userdata: resp });
        });
      });
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req, res, next) => {
    try {
      let user = {
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        organization: req.body.organization,
      };

      let sql = `INSERT into users SET ?`;
      // insert user into database
      const insertResponse = dbQuery(sql, user);
      // creating subadmin
      const dbResponse = await createDatabase(user.organization);

      await createSubAdmin({ ...user, role: 1 });

      //TODO !send mail

      res.send({
        status: 200,
        message: `User registered`,
        payload: {
          // link: "htt"
        },
      });
    } catch (error) {
      next(error);
    }
  },

  createAdminForDept: async (req, res, next) => {
    try {
      // destructure the request
      const { organizationName, userDetails } = req.body;

      await createSubAdmin({ organization: organizationName, ...userDetails });

      res.send({ status: "ok", message: "test" });
    } catch (error) {
      console.log("🚀 ~ file: user.controller.js:97 ~ error:", error);
      next(error);
    }
  },

  addFields: async (req, res, next) => {
    let request = req.body;
    const { organization, tableName, columnsAndTypes } = request;
    let alterColumnsData = columnsAndTypes
      .map((column) => {
        // destructre
        const { columnName, type } = column;
        return `ADD COLUMN ${columnName} ${type}`;
      })
      .join(",");
    try {
      let sql = `ALTER TABLE ${organization}.${tableName} ${alterColumnsData}`;
      const alterTable = await dbQuery(sql);
      res
        .status(200)
        .send({ status: true, message: "ADD NEW FIELD SUCCESSFULLY!" });
    } catch (error) {
      throw error;
    }
  },

  dropFields: async (req, res, next) => {
    let request = req.body;

    const { organization, tableName, columnName } = request;
    let alterColumns = columnName
      .map((column) => {
        return `DROP COLUMN ${column}`;
      })
      .join(",");

    try {
      // ALTER TABLE hr.users DROP COLUMN test, DROP COLUMN testOne;
      let sql = `ALTER TABLE ${organization}.${tableName} ${alterColumns}`;
      let dropTable = await dbQuery(sql);
      res
        .status(200)
        .send({ status: true, message: "DROPPED FIELDS SUCCESSFULLY" });
    } catch (error) {
      throw error;
    }
  },
};
