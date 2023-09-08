// @ts-nocheck
import favicon from './extensions/favicon.ico';
import logo from './extensions/logo_sg.png';

const config = {
  locales: [],
  auth: { logo },
  menu: { logo },
  head: {
    favicon: favicon,
  },
  translations: {
    en: {
      'app.components.LeftMenu.navbrand.title': 'SG promo dashboard',
      'Auth.form.welcome.title': 'Welcome to SG Promo!',
      'Auth.form.welcome.subtitle': 'Log in to your account'
    }
  },
  notifications: { release: false },
};

const bootstrap = (app) => {
  console.log('start');
};

export default {
  config,
  bootstrap,
};
