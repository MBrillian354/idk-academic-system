const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

//jangan lupa diisi
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (_, __, profile, done) => {
  try {
    const { name, email } = profile._json;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: 'GOOGLE_OAUTH', isVerified: true });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// No sessions