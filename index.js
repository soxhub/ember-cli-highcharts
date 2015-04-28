/* jshin	t node: true */
'use strict';

var path = require('path');

module.exports = {
	name: 'ember-cli-highcharts',
	/*setupPreprocessorRegistry: function(type, registry) {
		var options = getOptions(this.parent && this.parent.options && this.parent.options['babel']);

		var plugin = {
			name   : 'ember-cli-babel',
			ext    : 'js',
			toTree : function(tree) {
				return require('broccoli-babel-transpiler')(tree, options);
			}
		};

		registry.add('js', plugin);
	},*/
	
	blueprintsPath: function() {
		return path.join(__dirname, 'blueprints');
	},

	included: function(app) {
		this._super.included(app);
		
		var options = app.options.highcharts || { 	highcharts: {
														include: true,
														modules: {
															'broken-axis': 			false,
															'data': 				false,
															'canvas-tools': 		false,
															'drilldown': 			false,
															'exporting': 			false,
															'funnel': 				false,
															'heatmap': 				false,
															'no-data-to-display': 	false,
															'solid-gauge': 			false,
															'treemap': 				false
														},
														adapters: {
															'standalone-framework':	false
														}
													}
												};
		
		//highcharts + modules
		if(options.highcharts.include) {
			this.app.import(app.bowerDirectory + '/highcharts-release/highcharts.js');
			if(options.highcharts.modules) {
				for(var module in options.highcharts.modules) {
					var includeModule = options.highcharts.modules[module];
					if(includeModule) {
						this.app.import(app.bowerDirectory + '/highcharts-release/modules/' + module + '.js');
					}
				}
			}
			
			if(options.highcharts.adapters) {
				for(var adapter in options.highcharts.adapter) {
					var includeAdapter = options.highcharts.adapters[adapter];
					if(includeAdapter) {
						this.app.import(app.bowerDirectory + '/highcharts-release/adapters/' + adapter + '.js');
					}
				}
			}
		}
		
		//include shim
		this.app.import('vendor/ember-cli-highcharts/shim.js', {
			type: 'vendor',
			exports: { 'highcharts': ['default'] }
		});
	}
};

function getOptions(options) {
  options = options || {};

  // Ensure modules aren't compiled unless explicitly set to compile
  options.blacklist = options.blacklist || ['es6.modules'];

  if (options.compileModules === true) {
    if (options.blacklist.indexOf('es6.modules') >= 0) {
      options.blacklist.splice(options.blacklist.indexOf('es6.modules'), 1);
    }

    delete options.compileModules;
  } else {
    if (options.blacklist.indexOf('es6.modules') < 0) {
      options.blacklist.push('es6.modules');
    }
  }

  // Ember-CLI inserts its own 'use strict' directive
  options.blacklist.push('useStrict');

  return options;
}
