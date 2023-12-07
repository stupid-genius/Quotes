// import * as angular from 'angular';

/* TODO
change text size of quote to fit to div
add random mode
? allow filtering
allow selection from url
 ? change UI to be single
add MD service to allow MD in quotes
*/
const quotesApp = angular.module('quotesApp', []);

quotesApp.factory('quotesFactory', ['$q', '$http', function($q, $http){
	const getQuotes = $q.defer();
	$http.get('quotes.json')
		.success(function(list){
			const quotes = list.sort().map(function(e){
				const pair = e.split(/::/);
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
		const quotesFactory = {};
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

quotesApp.controller('quotesController', ['$scope', '$sce', 'quotesFactory', function($scope, $sce, getQuotes){
	getQuotes.then(function(quotesFactory){
		$scope.quotes = quotesFactory.all();
		$scope.selectQuote = function(id){
			const quote = quotesFactory.get(id);
			$scope.quote = $sce.trustAsHtml(quote.quote.replace(/\n/g, '<br />'));
			$scope.name = quote.name;
		};
	});
}]);
