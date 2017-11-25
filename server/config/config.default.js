'use strict';

module.exports = {
  // App name.
  appName: 'rent',

  // Server port.
  port: 4200,

  email: {
    mail_email: process.env.MAIL_EMAIL,
    mail_pass: process.env.MAIL_PASS
  },
  stripe: {
    stripe_key_test: "sk_test_IS5TCIlXaTXkMAwlCcYUXX4x",
    stripe_p_key_test: process.env.STRIPE_P_TEST_KEY,
    stripe_key: process.env.STRIPE_KEY,
    stripe_p_key: process.env.STRIPE_P_KEY,
    client_id_dev: 'ca_BGuTXpKNfn4X9DMRBxuXhRE8PmPaZSAo',
    client_id_prod: process.env.CLIENT_ID,
    authorize_uri: process.env.STRIPE_CLIENT_DEV,
    redirect_uri_dev: 'http://localhost:4200/auth',
    redirect_uri: 'https://rent-app-web.com/auth',
    token_uri: 'https://connect.stripe.com/oauth/token'
  },

  // easypost: {
  //   api_key: "ESrkEWiy1HGoTz2yYCsixA",
  //   test_key: "qXc0VXLlDThRA0KZjoKHtQ"
  // }

};
