const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let totv = [];

function totalv(value) {
  totv = value;
  for (i in totv) {
    console.log(totv[i].EMAIL);
  }
}

module.exports.totalvoilations = function (req, res) {
  let sql =
    "SELECT emaildetails.EMAIL FROM `" +
    datetime +
    "` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `" +
    datetime +
    "`.TRANSPORTER_CODE WHERE `" +
    datetime +
    "`.TOTAL_TRIPS_WITH_VOILATION>2;";
  let query = connection.query(sql, (err, emails) => {
    if (err) {
      throw err;
    } else {
      totalv(emails);
      var type = 4;
      mailer(emails.length, emails, type);
    }
  });
};