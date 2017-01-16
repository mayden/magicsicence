const connection    = require('../connection.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');


module.exports = function(salt) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done) {
    connection.query("SELECT * FROM users WHERE email = ?",
      [username],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          return done(null, false, req.flash('flashMessage', 'Sorry! That email is already taken.'));
        } else {
          const User = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              age: req.body.age,
              password: bcrypt.hashSync(password, salt),
              status: req.body.educationalstatus,
              study: req.body.subjectstudy
          };

          const insertQuery = "INSERT INTO users (firstname, lastname, email, password, age, educational_status, subject_study) values (?,?,?,?,?,?,?)";

          connection.query(insertQuery, [User.firstname, User.lastname, User.email, User.password, User.age, User.status, User.study],
            function(err, rows) {
              if (err) {
                console.log(err);
                return done(null, false, req.flash('flashMessage', 'were a problem adding you to the database.'));
              }

              User.id = rows.insertId;

              return done(null, User);
          });
        }
      })
  }));
}
