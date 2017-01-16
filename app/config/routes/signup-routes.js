const passport = require('passport');

module.exports = function(app) {
  /**
   * Receive Signin Form Data
  **/
  app.post('/signin',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/magic1');
  });

  /**
   * Display Signup Form
  **/
  app.get('/signup', function(req, res) {
    if(req.isAuthenticated())
      res.redirect('/magic1');


    res.render('signup', {
      user: (req.user) ? req.user : undefined,
      title: "Register & Start the magic!",
      flashMessage: req.flash('flashMessage')
    });
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/signup' }),
    function(req, res) {
      res.redirect('/magic1');
  });


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// to check if user is logged in or not. If logged in so continue, else - redirect to the magic page.
  function ifLoggedMoveToMagic(req, res, next) {
    if (!req.isAuthenticated())
      return next();
    else
      res.redirect('/magic1');
  }
}

