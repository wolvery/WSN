'use strict';

angular
    .module('wsnApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
    ])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $locationProvider.html5Mode(true);
            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });


            $stateProvider
                .state('wsn', {
                    url: '/',                    
                    views:{'root':
                    {controller: 'MainCtrl',templateUrl: '/home'},
                    'relay':
                    {controller: 'RelayCtrl',templateUrl: '/relay'},
                    'chart':
                    {controller: 'ChartCtrl',templateUrl: '/charts'},
                    'charthourly':{controller: 'ChartPerHourCtrl',templateUrl: '/charthourly'},
                    'chartdaily':
                    {controller: 'ChartPerDayCtrl',templateUrl: '/chartdaily'},
                    'chartaverage':
                    {controller: 'ChartPerAVGCtrl',templateUrl: '/chartaverage'}},
                    
                    resolve: {
                        loadMyDirectives: function($ocLazyLoad) {
                            return 
                                $ocLazyLoad.load({
                                    name: 'ngAnimate',
                                    files: ['bower_components/angular-animate/angular-animate.js']
                                })
                            $ocLazyLoad.load({
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            })
                            $ocLazyLoad.load({
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                            $ocLazyLoad.load({
                                name: 'ngTouch',
                                files: ['bower_components/angular-touch/angular-touch.js']
                            })

                        },
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: 'wsnApp',
                                    files: [
                                        'javascripts/controllers/main.js',
                                        'javascripts/controllers/chartController.js',
                                        'javascripts/controllers/chartPerHourController.js',                                        
                                        'javascripts/controllers/relay.js',
                                        'javascripts/controllers/chartPerDayController.js',
                                        'javascripts/controllers/chartAVGController.js'


                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'chart.js',
                                    files: [
                                        'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                        'bower_components/angular-chart.js/dist/angular-chart.css'
                                    ]
                                })
                        }

                    }
                }).state('wsn.relay', {
                    url: '^/relay'
                 })



        }
    ]); 



                // }).state('wsn.charthourly', {
                //     url: '^/charthourly',
                //     controller: 'ChartPerHourCtrl',
                //     views:{},
                //     resolve: {
                //         loadMyFiles: function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 name: 'wsnApp',
                //                 files: [
                                    
                //                 ]
                //             })
                //         }
                //     }

                // }).state('wsn.chartdaily', {
                //     url: '^/chartdaily',
                    
                //     views:{},
                    
                //     resolve: {
                //         loadMyFiles: function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 name: 'wsnApp',
                //                 files: [
                                    
                //                 ]
                //             })
                //         }
                //     }

                // }).state('wsn.chartaverage', {
                //     url: '^/chartaverage',
                //     controller: 'ChartPerAVGCtrl',
                //     views:{},
                    
                //     resolve: {
                //         loadMyFiles: function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 name: 'wsnApp',
                //                 files: [
                                    
                //                 ]
                //             })
                //         }
                //     }

                // });
// .run(function($rootScope) {
//     $rootScope.$on('$stateChangeStart', 
// function(event, toState, toParams, fromState, fromParams){ 
//     console.log('event',event);
//     console.log('toState',toState);
//     console.log('toParams',toParams);
//     console.log('fromState',fromState);
//     console.log('fromParams',fromParams);})