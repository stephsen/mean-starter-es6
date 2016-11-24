var uuid = require("uuid");
var db = require("../../../index").bucket;
var config = require("../../config");
var N1qlQuery = require('couchbase').N1qlQuery;


// let model = mongoose.model('Todo', todoSchema);
function Todo() {}

Todo.save = function(data, callback) {
  var todoSchema = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email
  };
    var documentId = data.document_id ? data.document_id : uuid.v4();
    db.upsert(documentId, todoSchema, function(error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, {
                message: "success",
                data: result
            });
        }
    });
};

Todo.getByDocumentId = function(documentId, callback) {
    var statement = "SELECT firstname, lastname, email " +
        "FROM `" + config.couchbase.bucket + "` AS users " +
        "WHERE META(users).id = $1";
    var query = N1qlQuery.fromString(statement);
    db.query(query, [documentId], function(error, result) {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
        console.log(result);
    });
};

Todo.delete = function(documentId, callback) {
    db.remove(documentId, function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, {
            message: "success",
            data: result
        });
    });
};

Todo.getAll = function(callback) {
    var statement = "SELECT META(users).id, firstname, lastname, email " +
        "FROM `" + config.couchbase.bucket + "` AS users";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};
module.exports = Todo;
