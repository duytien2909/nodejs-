const db = require("../config/data.json");

exports.homepage = async (req, res) => {
  const locals = { title: "Home Page" };
  let perpage = 5;
  let page = req.query.page || 1;
  const slider = await db.Movies.map((i) => i).slice(1, 5);
  const sliderTwo = await db.Movies.map((i) => i).slice(15, 30);
  const sliderThree = await db.Movies.map((i) => i).slice(31, 46);

  const movieTitle = await db.Movies.map((i) => i)
    .slice(perpage * page - perpage)
    .slice(0, perpage);

  const count = await db.Movies.length;

  try {
    res.render("index", {
      locals,
      movieTitle,
      current: page,
      slider,
      sliderTwo,
      sliderThree,
      pages: Math.ceil(count / perpage),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.movieManager = async (req, res) => {
  const locals = { title: "FAV" };
  let perpage = 5;
  let page = req.query.page || 1;

  const movieTitle = await db.Movies.map((i) => i)
    .slice(perpage * page - perpage)
    .slice(0, perpage);

  const count = await db.Movies.length;
  try {
    res.render("FAV/", {
      locals,
      movieTitle,
      current: page,
      pages: Math.ceil(count / perpage),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchMovie = async (req, res) => {
  const locals = {
    title: "Search Movie",
  };
  try {
    let searchProduct = req.body.searchItem;
    const movie = await db.Movies.find((i) => i.title === searchProduct);
    if (!movie) {
      alert("Movie not found")
    }
    res.render("FAV/search", {
      movie,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addMovie = async (req, res) => {
  const locals = { title: "FAV-ADD Movie" };
  try {
    res.render("FAV/add", { locals });
  } catch (error) {
    console.log(error);
  }
};

exports.postAddMovie = async (req, res) => {
  try {
    db.Movies.unshift(req.body);
    res.redirect(".");
  } catch (error) {
    console.log(error);
  }
};

exports.viewMovie = async (req, res) => {
  const locals = { title: "FAV-View Movie" };
  try {
    const id = req.params.id;

    const data = await db.Movies.find((i) => i.id === id);
    res.render("FAV/view", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

exports.editMovie = async (req, res) => {
  const locals = { title: "FAV-Edit Movie" };
  try {
    const id = req.params.id;

    const data = await db.Movies.find((i) => i.id === id);
    res.render("FAV/edit", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

exports.editPutMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    let index = db.Movies.findIndex((i) => i.id === id);

    if (index >= 0) {
      db.Movies.splice(index, 1, data);
    }
    res.redirect("/FAV/");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.Movies.find((i) => i.id === id);
    db.Movies.splice(data, 1);
    res.redirect("/FAV/");
  } catch (error) {
    console.log(error);
  }
};
