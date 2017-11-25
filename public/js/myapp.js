var myApp = angular.module("myApp", []);

myApp.controller("HeaderCtrl", function($scope) {
  $scope.header = {name: "header.html", url: "header.html"};
});

myApp.controller("PieCtrl", function($scope) {
  $scope.footer = {name: "footer.html", url: "footer.html"};
});
