const licenseGen = require("@mcnaveen/license-gen")
var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        session: req.session
    });
});

router.post('/login', function (request, response, next) {

    var user_email_address = request.body.domain;

    var user_password = request.body.licence_key;

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
                        response.send('Incorrect Licence Key');
                    }
                }
            } else {
                response.send('Incorrect Domain');
            }
            response.end();
        });
    } else {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});


var db = require('../database.js');
router.post('/n', function (req, res, next) {

    if (req.headers.authorization !== 'eW91cmxvZ2luOnlvdXJwYXNzd29yZA' &&
        req.query.key !== '5511')
        return res.status(401).send('Authentication required.')

    const key = licenseGen(42, 6)

    var domain = req.body.domain;
    var l_name = req.body.licence_key;
    console.log(key + ' | ' + domain)

    var sql = `INSERT INTO facebookc (domain_name, licence_key) VALUES ("${domain}", "${key}")`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        //req.flash('success', 'Data added successfully!');
        res.end('poop');
    });

    const nodemailer = require("nodemailer"); // Require the Nodemailer package
    async function main() {
        // SMTP config
        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com", //
            port: 587,
            auth: {
                user: "harry@belive.love", // Your Ethereal Email address
                pass: "A230586A9770630F49174B2CAA143BBA984E", // Your Ethereal Email password
            },
        }); // Send the email
        let info = await transporter.sendMail({
            from: '"Spider Servers" <no-reply@belive.love>',
            to: "hicin78668@randrai.com", // Test email address
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

router.post("/hook", (req, res) => {
    console.log(req.body) // Call your action on the request here
    res.status(200).end() // Responding is important
  })

router.get('/logout', function (request, response, next) {

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;