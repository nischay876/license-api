require("dotenv").config();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host : process.env.MYSQL_HOST || '139.162.226.125',
	database : process.env.MYSQL_DB || 'license',
	user : process.env.MYSQL_USER || 'nisch',
	password : process.env.MYSQL_PASS || '55115511*'
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