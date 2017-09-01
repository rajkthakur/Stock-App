'use strict';
var app = angular.module('stockApp');

app.controller('stockTickerController',['$scope','stockService',stockTickerController]);

var stockTickerController = function($scope,stockService){
	var ws = new WebSocket("ws://stocks.mnet.website");
	var stocksData = {}; 
	$scope.stocksData=[];

	ws.onopen = (event) => {
		$scope.message = 'Loading the data ...';
	}

	ws.onclose = (event) => {
		$scope.message = 'connection is temporary unavailable';
	}

	ws.onmessage = 	(data) => {
		data.forEach(([name, price]) => {
			stockService.updateData(name, price);
			updateStocksData(name, price);
		});
	}

	function updateStocksData(name, price){
		if(stocksData[name]){
			for(var i=0; i<$scope.stocksData.length;i++){
				if($scope.stocksData[i].name === name){
					if($scope.stocksData[i]['price'] < price){
						$scope.stocksData[i]['color'] = 'red';
					}
					if($scope.stocksData[i]['price'] > price){
						$scope.stocksData[i]['color'] = 'green';
					}
					$scope.stocksData[i]['price'] = price;
				}
			}	
		}
		else{
			stocksData[name] = price;
			var obj = {
				'name' : name,
				'price': price,
				'color': 'white'
			}
			$scope.stocksData.push(obj);
		}
	}

}
