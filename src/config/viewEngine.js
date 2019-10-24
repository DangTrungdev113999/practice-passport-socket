import express from "express";
import path from "path";


let configViewEngine = app => {
  app.use(express.static(path.join(__dirname, "./src/public")));
  app.set('view engine', "pug");
  app.set("views", path.join(__dirname, "./src/views"));
}

module.exports = configViewEngine;