const licenseGen = require("@mcnaveen/license-gen")
var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    /*res.render('index', {
        title: 'Express',
        session: req.session
    });*/
    //res.sendStatus(200)
    res.send(200, 'welcome');
});

router.post('/facebookc', function (request, response, next) {

    var user_email_address = request.body.domain;

    var user_password = request.body.code;

    if (user_email_address) {
        query = `
        SELECT * FROM facebookc 
        WHERE domain_name = "${user_email_address}"
        `;

        database.query(query, function (error, data) {

            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].licence_key == user_password) {
                        request.session.user_id = data[count].user_id;

                        response.json({
                            licence_key: user_password
                        });
                    } else {
                        response.json({
                            "error": {
                                "code": "102",
                                "message": "Invalid Purchase Code"
                            }
                        });
                    }
                }
            } else {
                response.json({
                    "error": {
                        "code": "102",
                        "message": "Invalid Domain Name"
                    }
                });
            }
            response.end();
        });
    } else {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});


var db = require('../database.js');
router.post('/hookfacebookc', function (req, res, next) {

    /*if (req.headers.authorization !== 'eW91cmxvZ2luOnlvdXJwYXNzd29yZA' &&
        req.query.key !== '5511')
        return res.status(401).send('Authentication required.')*/

    const key = licenseGen(42, 6)

    var domain = req.body.data.custom_fields.domain;
    var customer_email = req.body.data.customer_email;
    //var l_name = req.body.licence_key;
    console.log(customer_email + ' | ' + key + ' | ' + domain)

    var sql = `INSERT INTO facebookc (domain_name, licence_key, customer_email) VALUES ("${domain}", "${key}", "${customer_email}")`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        //req.flash('success', 'Data added successfully!');
        res.end('poop');
    });
    console.log(req.body)
    const nodemailer = require("nodemailer"); // Require the Nodemailer package
    async function main() {
        // SMTP config
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, //
            port: parseInt(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER, // Your Ethereal Email address
                pass: process.env.SMTP_PASS, // Your Ethereal Email password
            },
        }); // Send the email
        let info = await transporter.sendMail({
            from: '"Spider Servers" <smtp-relay.gmail.com>',
            to: customer_email, // Test email address
            subject: 'FACEBOOK COPY LICENSE KEY',
            text: `Domain=${domain} \n License Key=${key}`,
            html: `<p>Domain=</br><strong>${domain}</strong> </br></br></br> License Key=</br><strong>${key}</strong></p>`,
        });
        console.log("Message sent: %s", info.messageId); // Output message ID
        console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
    }
    // Catch any errors and output them to the console
    main().catch(console.error);

});

router.post("/h", (req, res) => {
    console.log(req.body) // Call your action on the request here
    res.status(200).end() // Responding is important
})

router.get('/logout', function (request, response, next) {

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;