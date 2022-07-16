const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  "172551604184-c5e7i1gr3s3d8j8s7b7vr08s294maoq4.apps.googleusercontent.com",
  "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",
  "1//04qH-jqqVWkk3CgYIARAAGAQSNwF-L9IrnM2lpl9Q14iuVrwQbiBw1WqoqLkYsECyfklXpFwszsyJ5LqQQB2GpQnnKw6slvVkjOo",
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, url, txt) => {
  oauth2Client.setCredentials({
    refresh_token:
      "1//04qH-jqqVWkk3CgYIARAAGAQSNwF-L9IrnM2lpl9Q14iuVrwQbiBw1WqoqLkYsECyfklXpFwszsyJ5LqQQB2GpQnnKw6slvVkjOo",
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "ghrairimarwa54@gmail.com",
      clientId:
        "172551604184-c5e7i1gr3s3d8j8s7b7vr08s294maoq4.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04qH-jqqVWkk3CgYIARAAGAQSNwF-L9IrnM2lpl9Q14iuVrwQbiBw1WqoqLkYsECyfklXpFwszsyJ5LqQQB2GpQnnKw6slvVkjOo",
      accessToken,
    },
  });

  const mailOptions = {
    from: "ghrairimarwa54@gmail.com",
    to: to,
    subject: "Boleto réinitialiser le mot de passe",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenue sur Boleto.</h2>
            <p>réinitialiser le mot de passe
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous :</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendEmail;
