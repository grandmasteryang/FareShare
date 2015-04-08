
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("getDepart", function(request, response) {
  var query = new Parse.Query("OrderRec");
  query.equalTo("destAddress", request.params.destAddress);
  query.find({
    success: function(results) {
      var depart = new Array(); 
      for (var i = 0; i < results.length; ++i) {
        depart[i] = results[i].get("departAddress");
      }
      response.success(depart);
    },
    error: function() {
      response.error("destAddress lookup failed");
    }
  });
});
