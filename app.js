var express = require('express'),
    http = require('http'),
    path = require('path'),
    lib = require('./db.js');

var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017);
new mongodb.Db('projectsDB', server, {w:1}).open(function (error, client) {
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
app.post('/project', function (req, res) {
    var b = req.body;
    var project = {name:b.name, site:b.site, description:b.description};

    lib.addProject(project, function (err, docs) {
        if (err) {
            return res.json({"error":"something went wrong: " + err});
        }
        res.json(docs[0]);//return the first item
    });
});

//Read
app.get('/project', function (req, res) {
    //if _id is passed, return that project
    if (req.query._id) {
        lib.getProject(req.query._id, function (err, project) {
            return err ? res.json(err) : res.json(project);
        });
    } else { //return all projects
        lib.getProjects(function (err, projects) {
            return err ? res.json(err) : res.json(projects);
        });
    }
});

//Update
app.put('/project', function (req, res) {
    var b = req.body;
    var project = {name:b.name, site:b.site, description:b.description};

    lib.updateProject(req.query._id, project, function (err, info) {
        if (err) {
            return res.json({"error":"something went wrong" + err});
        }
        project._id = req.query._id;
        res.json(project);
    });
});


//Delete
app.delete('/project', function (req, res) {
    lib.deleteProject(req.query._id, function (err, info) {
        res.json({"Error":err});
    });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});