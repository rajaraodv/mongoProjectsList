var express = require('express'),
    http = require('http'),
    path = require('path'),
    mysql = require('mysql'),
    lib = require('./db.js');

var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017);
new mongodb.Db('todosDB', server, {w:1}).open(function (error, client) {
    if (error) throw error;

    lib.setupDBAndTable(mongodb, client);
});

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//Create
app.post('/todo', function (req, res) {
    var b = req.body;
    var task = {name:b.name, site:b.site, description:b.description};

    lib.addTask(task, function (err, docs) {
        if (err) {
            return res.json({"error":"something went wrong: " + err});
        }
        res.json(docs[0]);//return the first item
    });
});

//Read
app.get('/todo', function (req, res) {
    //if _id is passed, return that task
    if (req.query._id) {
        lib.getTask(req.query._id, function (err, task) {
            return err ? res.json(err) : res.json(task);
        });
    } else { //return all tasks
        lib.getTasks(function (err, tasks) {
            return err ? res.json(err) : res.json(tasks);
        });
    }
});

//Update
app.put('/todo', function (req, res) {
    var b = req.body;
    var task = {name:b.name, site:b.site, description:b.description};

    lib.updateTask(req.query.id, task, function (err, info) {
        if (err) {
            return res.json({"error":"something went wrong" + err});
        }
        res.json(task);
    });
});


//Delete
app.delete('/todo', function (req, res) {
    lib.deleteTask(req.query._id, function (err, info) {
        res.json({"Error":err});
    });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});