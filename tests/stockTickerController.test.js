'use strict';
describe('stock-app', function () {

  beforeEach(module('stockApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('updateStockData', function () {
		it('expects pushing of data to stocksData array', function () {
			var $scope = {};
			var controller = $controller('stockTickerController', { $scope: $scope });
			$scope.updateStocksData('abc',5.008);
			expect($scope.stocksData[0].name).toBe('abc');
			expect($scope.stocksData[0].price).toBe('5.008');
			expect($scope.stocksData[0].color).toBe('white');
		});	
	});

});