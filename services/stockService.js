'use strict';

var app = angular.module('stockApp');

app.factory('stockService', function(){
	var stocks = {};
	return{
		updateData : function(name, price){
			console.log('service called');
			if(stocks[name]===undefined){
				stocks[name] = [];
			}
			stocks[name].push({
				'time' : Date.now(),
				'price': price
			});
			//console.log('data pushed with name '+name+" is "+JSON.stringify(stocks[name]));
		},
		getData : function(name){
			console.log('getdata called ');
			return stocks[name];
		}
	};
});
