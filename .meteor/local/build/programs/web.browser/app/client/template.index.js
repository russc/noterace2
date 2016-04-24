(function(){
Meteor.startup(function() { $('body').attr({"ng-app":"noterace2"}); });

Template.body.addContent((function() {
  var view = this;
  return [ HTML.NAV({
    "class": "navbar navbar-repsonsive navbar-inverse navbar-fixed-top"
  }, "\n    ", HTML.DIV({
    "class": "container"
  }, "\n      ", HTML.DIV({
    "class": "navbar-header"
  }, "\n        ", HTML.SPAN({
    "class": "icon-bar"
  }, HTML.getTag("meteor-include")({
    src: "loginButtons"
  })), "\n        ", HTML.Raw('<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>'), "\n\n        ", HTML.Raw('<a class="navbar-brand" href="#">NoteRace2</a>'), "\n      "), "\n      ", HTML.Raw('<div id="navbar" class="collapse navbar-collapse">\n\n        <ul class="nav navbar-nav">\n          <li><a href="/race">Race</a></li>\n        </ul>\n      </div>'), "\n    "), "\n  "), HTML.Raw('\n  <div class="container" style="margin-top:75px;">\n    <div ui-view=""></div>\n  </div>') ];
}));
Meteor.startup(Template.body.renderToDocument);

})();
