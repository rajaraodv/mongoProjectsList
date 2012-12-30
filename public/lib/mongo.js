//Update this to use mysql
angular.module('mongo', ['ngResource']).
    factory('Project', function ($resource) {
        var Project = $resource('/project', {}, {update:{method:'PUT'}});

        Project.prototype.update = function (cb) {
            return Project.update({_id:this._id},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Project.prototype.destroy = function (cb) {
            return Project.remove({_id:this._id}, cb);
        };

        return Project;
    });