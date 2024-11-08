const formData = require('form-data');
const Mailgun = require('mailgun.js');
const DOMAIN = 'luduvigo.com';

const fromAddress = 'FantaGoat <paolo@luduvigo.com>';

const initializeMailgun = () => {
  const API_KEY = process.env.MAILGUN_API_KEY;

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: 'api',
    key: API_KEY,
    url: 'https://api.eu.mailgun.net',
  });

  return client;
};

// const sendForgotPasswordEmail = async (email, updatePasswordUrl) => {
//   try {
//     const client = initializeMailgun();

//     const data = {
//       from: fromAddress,
//       to: email,
//       subject: 'Password Dimenticata',
//       template: 'forgot password',
//       'h:X-Mailgun-Variables': { link: updatePasswordUrl },
//     };

//     client.messages
//       .create(DOMAIN, data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const sendUserActivationEmail = async (email, emailData) => {
//   try {
//     const client = initializeMailgun();

//     const data = {
//       from: fromAddress,
//       to: email,
//       subject: 'Attivazione Profilo Cliente Movolab',
//       template: 'add new client profile',
//       'h:X-Mailgun-Variables': {
//         fullName: emailData.fullName,
//         link: emailData.updatePasswordUrl,
//       },
//     };

//     client.messages
//       .create(DOMAIN, data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = {
  //   sendForgotPasswordEmail,
  //   sendUserActivationEmail,
};
