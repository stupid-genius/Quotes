// jshint devel:true
'use strict';

/* TODO
change text size of quote to fit to div
add random mode
? allow filtering
allow selection from url
 ? change UI to be single
add MD service to allow MD in quotes
*/
var quotesApp = angular.module('quotesApp', []);

quotesApp.factory('quotesFactory', ['$q', '$http', function($q, $http){
	var getQuotes = $q.defer();
	$http.get('scripts/quotes.json')
	.success(function(list){
		var quotes = list.sort().map(function(e){
			var pair = e.split(/::/);
			return {
				name: pair[0],
				quote: pair[1]
			};
		});
		getQuotes.resolve(quotes);
	})
	.error(function(e){
		console.error(e);
	});

	return getQuotes.promise.then(function(quotes){
		var quotesFactory = {};
		quotesFactory.get = function(index){
			return quotes[index];
		};
		quotesFactory.start = function(){

		};
		quotesFactory.next = function(){

		};
		quotesFactory.prev = function(){

		};
		quotesFactory.all = function(){
			return quotes;
		};
		return quotesFactory;
	});
}]);

quotesApp.controller('quotesController', ['$scope', 'quotesFactory', function($scope, getQuotes){
	getQuotes.then(function(quotesFactory){
		$scope.quotes = quotesFactory.all();
		$scope.selectQuote = function(id){
			var quote = quotesFactory.get(id);
			$scope.quote = quote.quote;
			$scope.name = quote.name;
		};
	});
}]);
