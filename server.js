var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = app.listen(1337);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index');
})


io.on('connection', function(socket){
    socket.emit('greeting', { msg: 'Greetings, from serverNode, brought to you by Sockets! - Server'})
    socket.on('thankyou', function(data){
        console.log(data.msg + "- from client: ");
    });
    socket.on('form', function(data){
        console.log(data);
        socket.emit('msg', data);
    });
});

