exports.setupDBAndTable = function (mongodb, client) {
    var ObjectID = mongodb.ObjectID;
    var todosCollection = new mongodb.Collection(client, 'todos');

    exports.addTask = function (task, callback) {
        todosCollection.insert(task, {safe:true}, callback);
    };

    exports.updateTask = function (id, task, callback) {
        todosCollection.update({_id:new ObjectID(id)}, {$set:{name:task.name, site:task.site, description:task.description}}, {safe:true}, callback);
    };

    exports.getTasks = function (callback) {
        todosCollection.find({}).toArray(callback);
    };

    exports.getTask = function (id, callback) {
        todosCollection.findOne({_id:new ObjectID(id)}, callback);
    };

    exports.deleteTask = function (id, callback) {
        todosCollection.remove({_id:new ObjectID(id)}, callback);
    };
};

