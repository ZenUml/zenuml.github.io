function getUrlParam (param) {
  var codedParam = (new RegExp(param + '=([^&]*)')).exec(window.location.search)[1];
  return decodeURIComponent(codedParam);
};

//https://gist.github.com/hagenburger/500716
var JavaScript = {
  load: function(src, callback) {
	  var loaded;
	  var script = document.createElement('script');
	  script.setAttribute('src', src);

	  if (callback) {
	    script.onreadystatechange = script.onload = function() {
	      if (!loaded) {
		callback();
	      }
	      loaded = true;
	    };
	  }
	  document.getElementsByTagName('head')[0].appendChild(script);
	  return script;
	}
};

function loadMacroBody(callback) {
  AP.require("request", function(request) {
    var pageId = getUrlParam("pageId");
    var pageVersion = getUrlParam("pageVersion");
    var macroId = getUrlParam("macroId");
    request({
      url: "/rest/api/content/" + pageId +
      "/history/" + pageVersion +
      "/macro/id/" + macroId,
      success: function(response) {
	var macro = JSON.parse(response);
	callback(macro.body);
      }
    });
  });
}

function getConnectUrl() {
  var baseUrl = getUrlParam('xdm_e') + getUrlParam('cp');
  var url = baseUrl + '/atlassian-connect/all.js';
  return url;
}
