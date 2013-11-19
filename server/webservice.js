var restify = require('restify');

var redis = require("redis"),
        redisClient = redis.createClient();

function getTasks(req, res, next) {
	redisClient.smembers("task:names", function(err, reply) {
		res.send({
			title: reply
		});
	});
}

function addTask(req, res, next) {
	redisClient.sadd("task:names", req.params.name, function(err, reply) {
		res.send(201, Math.random().toString(36).substr(3, 8));
	});
}
		
function respond(req, res, next) {
	redisClient.get("test:some", function(err, reply) {
		res.send({
			title: reply
		});
	});
}

var server = restify.createServer();
server.get('/tasks', getTasks);
server.post('/tasks', addTask);
server.get('/task/:name', respond);

server.listen(4080, function() {
  console.log('%s listening at %s', server.name, server.url);
});