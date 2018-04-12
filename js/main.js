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
            'title': 'test'
        },
        {
            'title': 'test'
        },
        {
            'title': 'test'
        },
        {
            'title': 'test'
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
        template: '<span ng-bind="item.title"></span>'
    }
})