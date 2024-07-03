"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var app = (0, express_1.default)();
var port = 3000;
app.use(cors());
app.use(express_1.default.json());
var alumnosMessages = [];
var docentesMessages = [];
app.post('/send', function (req, res) {
    var _a = req.body, message = _a.message, type = _a.type;
    if (type === 'alumno') {
        alumnosMessages.push(message);
    }
    else if (type === 'docente') {
        docentesMessages.push(message);
    }
    res.status(200).send('Message sent');
});
app.get('/events/alumnos', function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    setInterval(function () {
        res.write("data: ".concat(JSON.stringify(alumnosMessages), "\n\n"));
    }, 1000);
});
app.get('/events/docentes', function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    setInterval(function () {
        res.write("data: ".concat(JSON.stringify(docentesMessages), "\n\n"));
    }, 1000);
});
app.listen(port, function () {
    console.log("Servidor corriendo en el puerto:".concat(port));
});
