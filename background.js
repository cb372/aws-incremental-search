var searchBox = $('<input id="searchBox" tabindex="1" style="margin-left: 10px;">');

var serviceLinksContainer = $('#tabbed-service-list');
var serviceLinks = serviceLinksContainer.find('a[data-service-id]');
var matchingLinks = null;

function filterServiceLinks(query) {
  return serviceLinks.filter(function(i, elem) {
    return query != '' && $(elem).text().toLowerCase().indexOf(query) > -1;
  });
}

function updateMatchingLinks(matching) {
  matchingLinks = matching;

  serviceLinks.css('color', '');
  serviceLinks.css('background', '');

  matchingLinks.css('color', 'yellow');
  matchingLinks.css('background', 'rgba(54, 25, 25, .3)');
  matchingLinks.first().css('background', 'rgba(54, 25, 25, .6)');
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

// The label is in uppercase ("SHOW CATEGORIES") but this is done using CSS text-transform
var showCategoriesLabel = $("span:contains('Show categories')");
searchBox.insertAfter(showCategoriesLabel);
setTimeout(function(){ searchBox.focus() }, 0);

// Scroll past the crud at the top of the page
$('html, body').animate({
  scrollTop: serviceLinksContainer.offset().top
}, 500);
