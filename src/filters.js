import * as timeago from 'timeago.js';
import Vue from 'vue';

var locale = function(number, index) {
    return [
      ['ara mateix', 'right now'],
      ['fa %s segons', 'in %s seconds'],
      ['fa 1 minut', 'in 1 minute'],
      ['fa %s minuts', 'in %s minutes'],
      ['fa una hora', 'in 1 hour'],
      ['fa %s hores', 'in %s hours'],
      ['fa 1 dia', 'in 1 day'],
      ['fa %s dies', 'in %s days'],
      ['fa 1 setmana', 'in 1 week'],
      ['fa %s setmanes', 'in %s weeks'],
      ['fa 1 mes', 'in 1 month'],
      ['fa %s mesos', 'in %s months'],
      ['fa 1 any', 'in 1 year'],
      ['fa %s anys', 'in %s years']
    ][index];
};
timeago.register('ca', locale);

Vue.filter('timeago', function (value) {
    if (!value) return ''
    return timeago.format(value*1000,'ca')
})