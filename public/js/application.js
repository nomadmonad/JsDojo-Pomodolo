// jquery websocket
// http://code.google.com/p/jquery-websocket/
$(function(){
  // // WebSocketサーバに接続
  // var ws = $.websocket("ws://localhost:5000/", {
  //   open: function() {
  //     // hogehoge
  //     alert("Open!");
  //   },
  //   close: function() {
  //     alert("Close");
  //   },
  //   events: {
  //     message: function(e) {
  //       $('#time').text(e.data.time);   // '00:00'
  //       $('#todaySpace').text(e.data.today);  // '1'
  //       $('#totalSpace').text(e.data.total);  // '10'
  //     },
  //     finish: function(e) {
  //       var _msg = (e.data.msg) ? (e.data.msg) : "よかったね！";
  //       $('#todaySpace').text(e.data.today);  // '1'
  //       $('#totalSpace').text(e.data.total);  // '10'
  //     }
  //   }
  // });

  // WebSocketサーバに接続
  var ws = new WebSocket('ws://localhost:5000/');

  var _isstart = false;

  // WebSocketサーバ接続イベント
  ws.onopen = function() {
    // 入室情報を文字列に変換して送信
    ws.send(JSON.stringify({
      type: 'join',
      user: 'aaa '
    }));
  };

  // メッセージ受信イベントを処理
  ws.onmessage = function(event) {
    // 受信したメッセージを復元
    console.log(event);
    var data = JSON.parse(event.data);

    if(data.type == "render"){
      $('#time').text(data.currentTime);   // '00:00'
      $('#todaySpace').text(data.today);  // '1'
      $('#totalSpace').text(data.total);  // '10'
    } else if(data.type == "finish"){
      $('#time').text(data.currentTime);   // '00:00'
      $('#todaySpace').text(data.today);  // '1'
      $('#totalSpace').text(data.total);  // '10'

      $('#alert').text('Congratulations!');
      _isstart = false;
      $(this).text('START!');
    }
  };

  // スタート
  $('#button').click(function(){
    if(!_isstart){
      ws.send(JSON.stringify({
        type: 'start',
        message: '25'
      }));
      $(this).text('QUIT');
      _isstart = true;

      $('#alert').text('');
    } else {
      ws.send(JSON.stringify({
        type: 'quit',
        message: '25'
      }));
      $(this).text('START!');
      _isstart = false;
    }
  });







});
