
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 5000});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var timer;
function changeTime($_time) {
  var _min = Math.floor($_time / 60);
  var _sec = ($_time - _min*60) % 60;
  _sec = (_sec < 10) ? '0'+_sec : _sec; 
  return _min + ':' + _sec;
}

function startCountDown(_ws) {
  var _time = 25 * 60;
  timer = setInterval(function(){
    _time--;

    var _renderTime = changeTime(_time);

    _ws.send(JSON.stringify({type:'render',currentTime:_renderTime,today:10,total:10}));
  }, 1000);
}

wss.on('connection', function(ws) {
  console.log("WebSocket server listening on");
  ws.on('message', function(value) {
    console.log('received: %s', value);

    var data = JSON.parse(value);
    if(data.type == 'start'){
      ws.send(JSON.stringify({type:'render',currentTime:'25:00',today:10,total:10}));
      startCountDown(ws);
    } else if(data.type == 'quit'){
      ws.send(JSON.stringify({type:'render',currentTime:'25:00',today:5,total:5}));
      clearInterval(timer);
    }

  });
  // ws.send(JSON.stringify({currentTime:'25:00',today:2,total:25}));
});

