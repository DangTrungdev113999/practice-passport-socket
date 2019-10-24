import express from "express";
import path from "path";


let configViewEngine = app => {
  app.use(express.static( "./src/public"));
  app.set('view engine', "pug");
  app.set("views", "./src/views");
}

module.exports = configViewEngine;