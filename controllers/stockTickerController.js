'use strict';
var app = angular.module('stockApp');


app.controller('stockTickerController',['$scope','stockService',function stockTickerController($scope,stockService){
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
			$scope.updateStocksData(name, price);
			$scope.$apply();
		});
	}
        ws.onerror = (event) =>{alert('problem occured while establishing websocket connection');}
	$scope.updateStocksData = function(name, price){
		if(stocksData[name]){
			for(var i=0; i<$scope.stocksData.length;i++){
				var currTime = parseInt(Date.now(),10);
				var currStockTime = parseInt($scope.stocksData[i]['time'],10);
				var timeDiff = currTime-currStockTime;
                $scope.stocksData[i]['elapsed'] = timeElapsed(timeDiff);
				if($scope.stocksData[i].name === name){
					$scope.stocksData[i]['time'] = Date.now();
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
				'color': 'white',
				'elapsed': '0 seconds ago',
				'time': Date.now()
			}
			$scope.stocksData.push(obj);
			console.log('stocks data');
			console.log($scope.stocksData);
		}
               // $scope.$apply();
	}
	var timeElapsed = (time) =>{
	 	var seconds = Math.round(time/1000);
	 	
	 	var day = Math.round(seconds/(60*60*24));
	 	seconds= seconds % (60*60*24);
	 	if(day > 1)
	 		return "more than "+day+" days ago";
	 	
	 	var hours = Math.round(seconds/(60*60))
	 	if(hours>1)
	 	return "more than "+hours+" hours ago";
	 	seconds = seconds % (60*60);
	 	
	 	var minutes = seconds/60;
	 	if(minutes > 1)
	 	return "more than "+minutes+" minutes ago";
		seconds = seconds % 60;

		if(seconds >= 1)
			return "more than "+seconds+" seconds ago";
		return time+" ms ago";
	}
}]);
