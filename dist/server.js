"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1["default"])();
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use(function (req, res, next) {
    req.hidden = 'hidden';
    next();
});
app.get('/', function (req, res) {
    res.json({ message: 'hello' });
});
app.use('/api', auth_1.protect, router_1["default"]);
app.post('/user', user_1.createNewUser);
app.post('/signin', user_1.signin);
app.use(function (error, req, res, next) {
    if (error.type === 'auth') {
        res.status(401).json({ message: 'unauthorised' });
    }
    else if (error.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    }
    else {
        res.status(500).json({ message: "oops, that's on us" });
    }
});
exports["default"] = app;
//# sourceMappingURL=server.js.map