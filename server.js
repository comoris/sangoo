const express = require('express');
const app = express();
var cors = require('cors')
const path = require('path');
const PORT = process.env.PORT || 5000;

var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const CONTACT_ADDRESS = 'joriscompernol@solenoid.be';

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(require('body-parser').json())
app.post('/contact', (req, res) => {

    var from_email = new helper.Email(req.body.from);
    var to_email = new helper.Email(CONTACT_ADDRESS);
    var subject = 'New messeage from website';
    var content = new helper.Content('text/plain', req.body.remarks);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (apiError, apiResponse) {
        if (apiError) {
            console.log('apiError', apiError);
            res.json(apiError);
        } else {
            res.status(apiResponse.statusCode);
            res.json(apiResponse);
        }
    });
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


// https://medium.com/datafire-io/simple-backends-four-ways-to-implement-a-contact-us-form-on-a-static-website-10fc430984a4
// https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/
// https://www.npmjs.com/package/nodemailer-sendgrid-transport