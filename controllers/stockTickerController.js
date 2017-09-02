'use strict';
var app = angular.module('stockApp');

app.controller('stockTickerController',['$scope','stockService',function($scope,stockService){
        console.log('entered into controller');
	var ws = new WebSocket("ws://stocks.mnet.website");
	var stocksData = {}; 
	$scope.stocksData=[];

	ws.onopen = (event) => {
                console.log('connection opened !!');
		$scope.message = 'Loading the data ...';
	}

	ws.onclose = (event) => {
		$scope.message = 'connection is temporary unavailable';
	}

	ws.onmessage = 	(event) => {
		var data = JSON.parse(event.data);
		data.forEach(([name, price]) => {
			stockService.updateData(name, price);
			updateStocksData(name, price);
		});
	}

	function updateStocksData(name, price){
		if(stocksData[name]){
			for(var i=0; i<$scope.stocksData.length;i++){
				if($scope.stocksData[i].name === name){
					if($scope.stocksData[i]['price'] < price.toFixed(3)){
						$scope.stocksData[i]['color'] = 'red';
					}
					if($scope.stocksData[i]['price'] > price.toFixed(3)){
						$scope.stocksData[i]['color'] = 'green';
					}
					$scope.stocksData[i]['price'] = price.toFixed(3);
				}
			}	
		}
		else{
			stocksData[name] = price;
			var obj = {
				'name' : name,
				'price': price.toFixed(3),
				'color': 'white'
			}
			$scope.stocksData.push(obj);
			console.log('stocks data');
			console.log($scope.stocksData);
			$scope.$apply();
		}
	}

}]);
