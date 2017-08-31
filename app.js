'use strict';

var app = angular.module('stockApp',['ngRoute']);

app.config(function($routeProvider){
 $routeProvider.when('/',{
	templateUrl : 'templates/stockTicker.html',
        controller: 'controllers/liveStockController.js'
 });

});


