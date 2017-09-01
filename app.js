'use strict';

var app = angular.module('stockApp',['ngRoute']);

app.config(function($routeProvider){
 $routeProvider.when('/',{
	templateUrl : 'templates/stockDetails.html',
        controller: 'controllers/stockTickerController.js'
 });

});


