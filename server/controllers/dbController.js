const db = require('../models/booksModels');
const dbController = {};

// a controller to turn the authentication token into a user id for future queries
dbController.tokenToUser = function(req, res, next){
  console.log('CHANGING TOKEN TO USERID');
  const token = req.sessionID;
  console.log('TOKEN: ', token);
  const queryArray = [token];
  const queryString = `
  SELECT
    id
  FROM
    users
  WHERE
    token=$1`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log("USER ID: ", response.rows);
    res.locals.user_id = response.rows[0].id;
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });
}

// return the user's wishlist
dbController.getWishlist = function (req, res, next){
  const queryArray = [res.locals.user_id];
  const queryString = 
  `SELECT
    book_id,  title, author, genre, isbn, img_url 
  FROM 
    wishlist LEFT JOIN books ON wishlist.book_id=books.id
  WHERE
    wishlist.user_id=$1`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('HERE IS THE RESULT OF THE WISHLIST QUERY: ', response.rows);
    res.locals.wishlist = response.rows;
    next();
  }).catch(err =>
    next(err)
  );
};


// return the user's library
dbController.getUserLibrary = function (req, res, next){
  const queryArray = [res.locals.user_id];
  const queryString = 
  `SELECT
    book_id,  title, author, genre, isbn, img_url 
  FROM 
    user_library LEFT JOIN books ON user_library.book_id=books.id
  WHERE
    user_library.user_id=$1`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('HERE IS THE RESULT OF THE USER LIBRARY QUERY: ', response.rows);
    res.locals.userLibrary = response.rows;
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });
};

// add a book to the table of books (in preparating for adding it to the wishlist or user_library)
dbController.addBook = function (req, res, next){
  const user_id = res.locals.user_id;
  const x =  req.body
  const isbn = x.isbn || '';
  const img_URL = x.img_URL || '';
  const queryArray = [user_id, x.title, x.author, x.genre, isbn, img_URL];
  console.log('REQ.BODY: ', req.body);
  console.log('QUERYARRAY: ', queryArray);
  const queryString = 
  `INSERT INTO
    books(user_id, title, author, genre, isbn, img_URL)
  VALUES
    ($1, $2, $3, $4, $5, $6)
  RETURNING
    id`;
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF BOOK ENTRY and BOOK_ID: ', response.rows);
    res.locals.newBookID = response.rows[0];
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });
};

// add a book to the wish list
dbController.addToWishlist = function(req, res, next){
  //const queryArray = [res.locals.user_id, res.locals.book_id];
  //res.locals.newBookID = {id: 23};
  console.log("STARTING TO ADD TO WISH LIST", res.locals.user_id);
  const queryArray = [res.locals.user_id, res.locals.newBookID.id];
  console.log('queryarray: ', queryArray);
  const queryString = 
  `INSERT INTO
    wishlist(user_id, book_id)
  VALUES
    ($1, $2)`
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF WISHLIST ADDITION: ', response);
    next();
  }).catch(err => {
    console.log('ERROR: ', err);
    next(err);
  });

};



// add a book to the library
dbController.addToUserLibrary = function(req, res, next){
  //const queryArray = [res.locals.user_id, res.locals.book_id];
  //res.locals.newBookID = {id: 23};
  const queryArray = [res.locals.user_id, res.locals.newBookID.id];
  const queryString = 
  `INSERT INTO
    user_library(user_id, book_id)
  VALUES
    ($1, $2)`
  db.query(queryString, queryArray)
  .then(response => {
    console.log('CONFIRMATION OF USER LIBRARY ADDITION: ', response);
    next();
  }).catch(err =>
    next(err)
  );

};


// delete a book from the wishlist


dbController.findUserOrCreate = (req, res, next) => {
  const query = `insert into users (email, token) values ($1, $2) on conflict (email) do update set token = $2 returning *;`;
  const values = [req.user.emails[0].value, req.sessionID];

  db.query(query, values).then(data => {
    return next();
  }).catch(err => {
    return next({log: err, message: "err from dbcontroller findOneOrCreate"})
  })
}

module.exports = dbController;
