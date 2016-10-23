$(document).ready(function() {
  var countUpOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '&#36;',
    suffic: ''
  };

  $.get('https://api.edgebet.net/stats', function(res) {
    new CountUp("total-turnover-value", 0, Math.round(res.totalTurnover), 0, 1, countUpOptions).start();
    new CountUp("total-profit-value", 0, Math.round(res.totalProfit), 0, 1, countUpOptions).start();  
  });
  var ref = new Firebase("https://edgebet.firebaseio.com");
  var startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  var currencies;
  var old_turnover = 0;
  var turnover = 0;

  var demo = new CountUp("todays-turnover-value", turnover, 0, 0, 2, countUpOptions);

  ref.child("currencies").once("value", function(snap) {
    currencies = snap.val()
    ref.child("userbets").orderByChild("createdAt").startAt(startOfDay.getTime()).on("child_added", function(snap) {
      var userbet = snap.val();
      var wager = userbet.wager
      old_turnover = turnover;
      if (userbet.currency !== "USD")
        wager *= currencies[userbet.currency]["USD"]
      turnover += wager

      demo = new CountUp("todays-turnover-value", old_turnover, Math.round(turnover), 0, 2, countUpOptions);
      demo.start();
    })
  })
});
