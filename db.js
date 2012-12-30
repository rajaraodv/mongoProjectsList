exports.setupDBAndTable = function (mongodb, client) {
    var ObjectID = mongodb.ObjectID;
    var projectsCollection = new mongodb.Collection(client, 'projects');

    exports.addProject = function (project, callback) {
        projectsCollection.insert(project, {safe:true}, callback);
    };

    exports.updateProject = function (id, project, callback) {
        projectsCollection.update({_id:new ObjectID(id)}, {$set:{name:project.name, site:project.site, description:project.description}}, {safe:true}, callback);
    };

    exports.getProjects = function (callback) {
        projectsCollection.find({}).toArray(callback);
    };

    exports.getProject = function (id, callback) {
        projectsCollection.findOne({_id:new ObjectID(id)}, callback);
    };

    exports.deleteProject = function (id, callback) {
        projectsCollection.remove({_id:new ObjectID(id)}, callback);
    };
};

