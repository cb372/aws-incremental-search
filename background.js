var searchBox = $('<input id="searchBox" style="margin-left: 10px;">');

var serviceLinks = $('a.service');
var matchingLinks = null;

function filterServiceLinks(query) {
  return serviceLinks.filter(function(i, elem) {
    return query != '' && $(elem).find($('div.serviceName')).text().toLowerCase().indexOf(query) > -1;
  });
}

function updateMatchingLinks(matching) {
  matchingLinks = matching;
  serviceLinks.css('background', '');
  matchingLinks.css('background', 'rgba(54, 25, 25, .1)');
  matchingLinks.first().css('background', 'rgba(54, 25, 25, .3)');
}

searchBox.bind('keyup', function() {
  var query = $(this).val().toLowerCase();
  var matching = filterServiceLinks(query);
  updateMatchingLinks(matching);
});

$(document).bind('keypress', function(e) {
  if (e.which == 13) {
    e.preventDefault();
    if (!!matchingLinks) {
      // click the first matching service
      window.location.href = matchingLinks[0].href;
    } 
  }
});

// Show the search box at the top of the page
searchBox.appendTo($('#servicesHeading'));
searchBox.focus();
