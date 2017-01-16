var db = require('../connection');

module.exports = function(app) {
  /**
   * Display Home Page
  **/
  app.get('/', function(req, res) {
    res.render('index', {
      user: (req.user) ? req.user : undefined,
      title: "Computer Science & Magic",
      flashMessage: req.flash('flashMessage')
    });
  });

  /**
   * Display Scores Page
   **/
  app.get('/scores', isLoggedIn, function(req, res) {
    var score = parseInt((req.user.score / 140)*100);
    res.render('scores', {
      user: (req.user) ? req.user : undefined,
      title: "Scores & Results",
      score: score,
      flashMessage: req.flash('flashMessage')
    });
  });


  /**
   * Display First Magic Page
   **/
  app.get('/magic1', isLoggedIn, function(req, res) {
    db.query('SELECT magic1 FROM users WHERE id = ?',  req.user.id, function(err, results) {
      if(err) {
        callback(err, null)
      }
      else
      {
        res.render('magic1', {
          user: (req.user) ? req.user : undefined,
          title: "Magic Experiment #1",
          prevDisplayed: results[0]["magic1"],
          flashMessage: req.flash('flashMessage')
        });
      }

      });
  });

  /**
   * Display Second Magic Page
   **/
  app.get('/magic2', isLoggedIn, function(req, res) {
    db.query('SELECT magic2 FROM users WHERE id = ?', req.user.id, function (err, results) {
      if (err) {
        callback(err, null)
      }
      else {
        res.render('magic2', {
          user: (req.user) ? req.user : undefined,
          title: "Magic Experiment #2",
          prevDisplayed: results[0]["magic2"],
          flashMessage: req.flash('flashMessage')
        });
      }
    });
  });
  /**
   * Display Third Magic Page
   **/
  app.get('/magic3', isLoggedIn, function(req, res) {
    db.query('SELECT magic3 FROM users WHERE id = ?',  req.user.id, function(err, results) {
      if(err) {
        callback(err, null)
      }
      else
      {
        res.render('magic3', {
          user: (req.user) ? req.user : undefined,
          title: "Magic Experiment #3",
          prevDisplayed: results[0]["magic3"],
          flashMessage: req.flash('flashMessage')
        });
      }
  });
  });

  /**
   * Updates the score by POST request
   **/
  app.post('/updatescore', function(req, res) {

    // gets the previous score

    db.query('SELECT score FROM users WHERE id = ?',  req.user.id, function(err, results) {
      if(err) {
        callback(err, null)
      }
      else
      {

        var score = +results[0]["score"] + +req.body.score;

        // updates the score
        db.query('UPDATE users SET score = ? WHERE id = ?', [score, req.user.id], function(err, rows)
        {
          if(err)
            console.log('Err in update the score:' + err);
          else
            console.log("UserId " + req.user.id + " has been won " + req.body.score + " points. (total score: " + score + ")");
        })

        if(req.body.magicId == 1)
        {
          db.query('UPDATE users SET magic1 = ? WHERE id = ?', [1, req.user.id], function(err, rows)
          {
            if(err)
              console.log('Err in update the score:' + err);
            else
              console.log("UserId " + req.user.id + " has been successfully submitted magicId " + req.body.magicId);
          })
        }
        else  if(req.body.magicId == 2)
        {
          db.query('UPDATE users SET magic2 = ? WHERE id = ?', [1, req.user.id], function(err, rows)
          {
            if(err)
              console.log('Err in update the score:' + err);
            else
              console.log("UserId " + req.user.id + " has been successfully submitted magicId " + req.body.magicId);
          })
        }
        else  if(req.body.magicId == 3)
        {
          db.query('UPDATE users SET magic3 = ? WHERE id = ?', [1, req.user.id], function(err, rows)
          {
            if(err)
              console.log('Err in update the score:' + err);
            else
              console.log("UserId " + req.user.id + " has been successfully submitted magicId " + req.body.magicId);
          })
        }
      }
    })


  });

// to check if user is logged in or not. If logged in so continue, else - redirect to the magic page.
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
      res.redirect('/');
  }
}
