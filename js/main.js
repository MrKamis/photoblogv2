let app = angular.module('photoBlog', ['ngFileUpload'])
.controller('navBar', ['$scope', '$rootScope', '$location', '$window', ($scope, $rootScope, $location, $window) => {
    $scope.active = 'w3-bottombar w3-border-yellow';
    $scope.deactive = '';
    $scope.start = (url) => {
        $location.url('kolekcja');
        $scope.kolekcja = {
            active: $scope.active
        }
    }
    $scope.start();
    $scope.go = (where) => {
        switch(where){
            case 'kolekcja':
                $rootScope.$broadcast('changePage', 'kolekcja');
                $location.url(where);
                $scope.kolekcja = {
                    active: $scope.active
                }
                $scope.panel = {
                    active: $scope.deactive
                }
                break;
            case 'panel':
                $rootScope.$broadcast('changePage', 'panel');
                $location.url(where);
                $scope.kolekcja = {
                    active: $scope.deactive
                }
                $scope.panel = {
                    active: $scope.active
                }
                break;
        }
    }
}])
.controller('content', ['$scope', '$http', 'Upload', ($scope, $http, Upload) => {
    $scope.currentPage = 'kolekcja';
    $scope.logged = false;
    $scope.sPic = [
        {
            'title': 'test',
            'src': 'upload/test.png',
            'date': '1992.02.12',
            'author': 'mrkamis',
            'likes': 0,
            'unlikes': 2
        },
        {
            'title': 'test',
            'src': 'upload/test.png',
            'date': '1992.02.12',
            'author': 'mrkamis',
            'likes': 0,
            'unlikes': 2
        },
        {
            'title': 'test',
            'src': 'upload/test.png',
            'date': '1992.02.12',
            'author': 'mrkamis',
            'likes': 0,
            'unlikes': 2
        },
        {
            'title': 'test',
            'src': 'upload/test.png',
            'date': '1992.02.12',
            'author': 'mrkamis',
            'likes': 0,
            'unlikes': 2
        }
    ]
    $scope.aPic = [];
    $scope.$on('changePage', (elem, arrgs) => {
        $scope.currentPage = arrgs;
    });
    $scope.start = () => {

    };
}])
.directive('myPhoto', () => {
    return{
        template: '<h3><span ng-bind="item.title"></span></h3>' +
        '<span class="w3-bar"><i class="w3-left"><img src="icons/002-avatar.png"></i><i ng-bind="item.author" class="w3-left"></i><i class="w3-right"><img src="icons/001-calendar.png"></i><i class="w3-right" ng-bind="item.date"></i></span>' +
        '<img src="{{item.src}}" alt="{{item.title}}" class="w3-button" ng-click="openPhoto(item.src)" style="width: 100%;">' +
        '<span class="w3-bar"><i class="w3-left"><img src="icons/005-thumb-up.png" class="w3-button" ng-click="like(item.src)"><span ng-bind="item.likes"></span></i><i class="w3-right"><img src="icons/004-thumb-down.png" class="w3-button" ng-click="unlike(item.src)"><span ng-bind="item.unlikes"></span></i></span>' 
    }
})