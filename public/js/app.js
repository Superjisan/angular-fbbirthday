'use strict';

window.angular.module('fbbirthday', [ 'ngCookies',
                                      'ngResource',
                                      'ui.bootstrap',
                                      'ui.router',
                                      'fbbirthday.system',
                                      'fbbirthday.articles',
                                      'fbbirthday.birthdays',
                                      'ui.bootstrap.datetimepicker',
                                      'fbbirthday.messages'

                                      ]);

window.angular.module('fbbirthday.system', []);
window.angular.module('fbbirthday.articles', []);
window.angular.module('fbbirthday.birthdays', []);
window.angular.module('fbbirthday.messages', [])

