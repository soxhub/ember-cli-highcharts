export function initialize(application) {
  application.registerOptionsForType('highcharts-config', { instantiate: false });
}

export default {
  name: 'highcharts',
  initialize: initialize
};
