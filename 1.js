var mysql = require('mysql');

var con = mysql.createConnection({
  host: "139.162.226.125",
  user: "nisch",
  password: "55115511*",
  database: "licence"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE facebookc SET domain_name = 'ggggg.gg' WHERE domain_name = 'gg.gg'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});