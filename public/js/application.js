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
    console.log(event.data.currentTime)
    var data = JSON.parse(event.data);
    $('#time').text(data.currentTime);   // '00:00'
    $('#todaySpace').text(data.today);  // '1'
    $('#totalSpace').text(data.total);  // '10'
  };

  // スタート
  $('#button').click(function(){
    ws.send('start', '25');
    console.log(ws);
  });







});
