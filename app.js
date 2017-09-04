'use strict';

var app = angular.module('stockApp',['ngRoute','chart.js']);

app.config(function($routeProvider){
 $routeProvider.when('/',{
	templateUrl : 'templates/stockDetails.html',
        controller: 'stockTickerController'
 });

});


