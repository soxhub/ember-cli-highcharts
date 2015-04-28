/* jshin	t node: true */
'use strict';

var path = require('path');

module.exports = {
	name: 'ember-cli-highcharts',
	blueprintsPath: function() {
		return path.join(__dirname, 'blueprints');
	},

	included: function(app) {
		this._super.included(app);
		
		var _highcharts = app.options.highcharts || { 	
																							include: true,
																							modules: {
																								/* //Don't need to specify these defaults since they are false
																								'broken-axis':        false,
																								'data':               false,
																								'canvas-tools':       false,
																								'drilldown':          false,
																								'exporting':          false,
																								'funnel':             false,
																								'heatmap':            false,
																								'no-data-to-display': false,
																								'solid-gauge':        false,
																								'treemap':            false
																								*/
																							},
																							adapters: {
																								/* //Don't need to specify false defaults
																								'standalone-framework':	false
																								*/
																							}
																						};
											
		//highcharts + modules
		if(_highcharts.include) {
			this.app.import(app.bowerDirectory + '/highcharts-release/highcharts.js');
			if(_highcharts.modules) {
				for(var module in _highcharts.modules) {
					var includeModule = _highcharts.modules[module];
					if(includeModule) {
						this.app.import(app.bowerDirectory + '/highcharts-release/modules/' + module + '.js');
					}
				}
			}
			
			if(_highcharts.adapters) {
				for(var adapter in _highcharts.adapter) {
					var includeAdapter = _highcharts.adapters[adapter];
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