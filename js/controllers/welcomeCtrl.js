angular.module("brewApp")

.controller("WelcomeCtrl", WelcomeController);

WelcomeController.$inject = ["$scope", "$http", 'goodFactory'];

function WelcomeController($scope, $http, goodFactory) {
    
    $scope.beers = [];    
    
    // var scroll = function() {
    //     $(window).scroll(function() {
    //         alert('you scrolled');
    //         if (this.scrollTop === 100) {
    //             console.log('you scrolled');
    //             $("#wrap").addClass("fixed");
    //         } 
    //         else {
    //             $(document).removeClass("fixed");
    //         }
    //     })
    // }
    
    var config = {headers: {Filter: 9993770}};
    
    $scope.goodEvents = [];
    $scope.avEvents = [];
    
    var getAvondaleCalendar = function() {
        $http.get('https://services.platypi.io/api/v1/events/', config).success(function(data) {
            console.log(data.data);
            var avEvents = data.data;
            $scope.avEvents = avEvents;
        }, function (err) {
            console.log(err);
        });
    }
    
    var getGoodCalendar = function() {
        $http.jsonp('http://api.tumblr.com/v2/blog/goodpeopleevents.tumblr.com/posts?callback=JSON_CALLBACK&api_key=I8vzOElWPL30QJgSCWH8aFTAySclmj4DRGu5JzavJOzWJm8FqM&tag=events&limit=10&_=1461703849658').success(function(data) {
            console.log(data.response.posts);
            var goodEvents = data.response.posts;
            $scope.goodEvents = goodEvents;
        });
    }
    
    var getBrews = function() {
        $http.get('https://api.untappd.com/v4/brewery/info/2811/GET?client_id=DBC75E152A90C85FFFDD9562522B89649EAF6252&client_secret=778095373400201EB85CE2084B4829C6C454A7DB').success(function(data) {
            console.log(data.response.brewery.beer_list.items);
            var beerList = data.response.brewery.beer_list.items;
            $scope.beers = beerList;
        }, function(err) {
            console.log(err);
        });
        // This does not work on load, as it requires a promise that needs to resolve.
        // goodFactory.getBrews();
        // console.log(goodFactory.brews[0]);
        // $scope.beers = goodFactory.brews[0];
    }
    $scope.getArray = function() {
        console.log($scope.events);
    }
    
    // $scope.init = scroll();
    $scope.init = getGoodCalendar();
    $scope.init = getAvondaleCalendar();
}