// jquery websocket
// http://code.google.com/p/jquery-websocket/
$(function(){
  // WebSocketサーバに接続
  var ws = $.websocket("ws://localhost:3000/", {
    open: function() {
      // hogehoge
      alert("Open!");
    },
    close: function() {
      alert("Close");
    },
    events: {
      message: function(e) {
        $('#time').text(e.data.time);   // '00:00'
        $('#todaySpace').text(e.data.today);  // '1'
        $('#totalSpace').text(e.data.total);  // '10'
      },
      finish: function(e) {
        var _msg = (e.data.msg) ? (e.data.msg) : "よかったね！";
        $('#todaySpace').text(e.data.today);  // '1'
        $('#totalSpace').text(e.data.total);  // '10'
      }
    }
  });

  // スタート
  $('#button').click(function(){
    ws.send('start', '25');
  });
});
