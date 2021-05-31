const Express = require("express");
const Router = Express.Router();
const UserController = require(`./controllers/users`);

const EnableProfiler = require('./lib/enable_profiler/EnableProfiler');

Router.use(function (req, res, next) {
    let session_id = req.session.id;
    let session = req.session;
    let variables = {
        post_data: req.body,
        get_data: req.params,
        session_data: {session, session_id},
        uri: req.url
    }
    req.profiler = variables;
    next();
});
Router.get("/", UserController.index);
Router.post("/login", UserController.login);
Router.post("/register", UserController.register);
Router.get("/home", UserController.home);
Router.get("/logout", UserController.logout);

module.exports = Router;