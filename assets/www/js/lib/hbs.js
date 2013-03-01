define(function() {
  var fetchText;
  var cache = {};

  var jsEscape = function(content) {
    return content.replace(/(['\\])/g, '\\$1')
      .replace(/[\f]/g, "\\f")
      .replace(/[\b]/g, "\\b")
      .replace(/[\n]/g, "\\n")
      .replace(/[\t]/g, "\\t")
      .replace(/[\r]/g, "\\r")
      .replace(/[\u2028]/g, "\\u2028")
      .replace(/[\u2029]/g, "\\u2029");
  };

  if (typeof window !== "undefined" && window.navigator && window.document && !window.navigator.userAgent.match(/Node.js/)) {
    // Browser action
    getXhr = function () {
      //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
      var xhr, i, progId;
      if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
      }
      else {
        for (i = 0; i < 3; i++) {
          progId = progIds[i];
          try {
            xhr = new ActiveXObject(progId);
          } catch (e) {}
          if (xhr) {
            progIds = [progId];  // so faster next time
            break;
          }
        }
      }
      if (!xhr) {
        throw new Error("getXhr(): XMLHttpRequest not available");
      }
      return xhr;
    };

    fetchText = function (url, callback) {
      var xhr = getXhr();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function (evt) {
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    };
  }
  else if (typeof process !== "undefined" && process.versions && !!process.versions.node) {
    //Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');
    fetchText = function ( path, callback ) {
      try {
        var body = fs.readFileSync(path, 'utf8');
        body = body.replace(/^\uFEFF/, '');
        callback(body);
      }
      catch (err) {
        callback('');
      }
      // we need to remove BOM stuff from the file content
    };
  }

  var tmpl = {};
  tmpl.load = function(name, require, load, config) {
    if (cache[name] !== undefined) {
      load(cache[name]);
      return;
    }

    if (typeof fetchText === 'undefined') {
      load.error('Unable to determine appropriate file loading mechanism (' + name + ')');
      return;
    }

    try {
      var ext = config.hbs.templateExtension || 'hbs';
      var path = name + '.' + ext;
      if (config.hbs.baseDir)
        path = config.hbs.baseDir + '/' + path;
      if (config.isBuild)
        path = require.toUrl(path);

      fetchText(path, function(text) {
        if (config.isBuild) {
          cache[name] = text;
          load(text);
        }
        else {
          require(['ember'], function(Ember) {
            var template;
            try {
              template = Ember.Handlebars.compile(text);
              cache[name] = template;
              Ember.TEMPLATES[name] = template;
              load(template);
            }
            catch (err) {
              load.error('Unable to compile template ' + name);
            }
          });
        }
      });
    }
    catch (err) {
      load.error('Unable to load template ' + name);
    }
  };

  tmpl.write = function(pluginName, resourceName, write) {
    if (resourceName in cache) {
      write("define('" + pluginName + "!" + resourceName + "', ['ember'], function(Ember) { var template = Ember.Handlebars.compile('" + jsEscape(cache[resourceName]) + "'); Ember.TEMPLATES['" + resourceName + "'] = template; return template; });\n");
    }
  };

  return tmpl;
});
