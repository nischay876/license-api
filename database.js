require("dotenv").config();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host : process.env.MYSQL_HOST || '',
	database : process.env.MYSQL_DB || '',
	user : process.env.MYSQL_USER || '',
	password : process.env.MYSQL_PASS || ''
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});
module.exports = connection;