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
    $scope.sPic = [];
    $scope.aPic = [];
    $scope.loginForm = '';
    $scope.registerFormLogin = ''
    $scope.registerFormRepeatPassword = '';
    $scope.loading = '';
    $scope.user = {
        lLogin: '',
        lPassword: '',
        rLogin: '',
        rPassword: '',
        rRepeatPassword: '',
        rEmail: ''
    }
    $scope.loggedUser = {
        login: ''
    }
    $scope.$on('changePage', (elem, arrgs) => {
        $scope.currentPage = arrgs;
    });
    $scope.start = () => {
        $http({
            method: 'GET',
            url: 'php/getAll.php',
        })
        .then((response) => {
            if(typeof(response) == 'object'){
                //console.log(response)
                $scope.aPic = response.data.tab;
                $scope.sPic = new Array();
                for(let x = 0; x < $scope.aPic.length; x++){
                    $scope.sPic.push($scope.aPic[x].tab[0]);
                    if(x > 10){
                        break;
                        $scope.nextPage = true;
                    }
                }
            }else{
                throw 'Wystapil nieprzewidziany error!';
            }
        })
    };
    $scope.login = () => {
        if($scope.user.lLogin.search(/[<>]/) != -1){
            $scope.loginFormLogin = 'w3-border-red w3-bottombar';
            $scope.loginFormPassword = '';
            return false;
        }else if($scope.user.lLogin == "" || $scope.user.lPassword == ""){
            $scope.loginFormPassword = 'w3-border-red w3-bottom';
            $scope.loginFormLogin = 'w3-border-red w3-bottombar';
            return false;
        }
        $scope.loading = 'display: block;';
        $http({
            method: 'POST',
            url: 'php/login.php',
            data: $.param({
                content: angular.toJson($scope.user)
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            //console.log(response.data)
            switch(response.data){
                case 'complete':
                    $scope.loggedUser.login = 'lLogin';
                    $scope.logged = true;
                    break;
                case '1':
                    $scope.logged = false;
                    $scope.loginFormPassword = 'w3-border-red w3-bottombar';
                    $scope.loginFormLogin = '';
                    break;
            }
            $scope.loading = '';
        })
    }
    $scope.register = () => {
        if($scope.user.rPassword != $scope.user.rRepeatPassword ){
            $scope.registerFormRepeatPassword = 'w3-border-red w3-bottombar';
            $scope.registerFormLogin = '';
            return false;
        }else if($scope.user.rLogin.search(/[<>]/) != -1){
            $scope.registerFormLogin = 'w3-border-red w3-bottombar';
            $scope.registerFormRepeatPassword = '';
        }else{
            $scope.loading = 'display: block;';
            $http({
                method: 'POST',
                url: 'php/register.php',
                data: $.param({
                    content: angular.toJson($scope.user)
                }),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                switch(response.data){
                    case 'complete':
                        $scope.loggedUser.login = $scope.user.rLogin;
                        $scope.logged = true;
                        break;
                    case '1':
                        $scope.registerFormRepeatPassword = 'w3-bottombar w3-border-red';
                        $scope.registerFormLogin = '';
                        break;
                    case '2':
                        $scope.registerFormLogin = 'w3-border-red w3-bottombar';
                        $scope.registerFormRepeatPassword = '';
                        break;
                }
                $scope.loading = '';
            })
        }
    }
    angular.element(() => {
        $scope.start();
    })
}])
.directive('myPhoto', () => {
    return{
        template: '<h3><span ng-bind="item.title"></span></h3>' +
        '<span class="w3-bar"><i class="w3-left"><img src="icons/002-avatar.png"></i><i ng-bind="item.author" class="w3-left"></i><i class="w3-right"><img src="icons/001-calendar.png"></i><i class="w3-right" ng-bind="item.date"></i></span>' +
        '<img src="{{item.src}}" alt="{{item.title}}" class="w3-button" ng-click="openPhoto(item.src)" style="width: 100%;">' +
        '<span class="w3-bar" ng-show="logged"><i class="w3-left"><img src="icons/005-thumb-up.png" class="w3-button" ng-click="like(item.src)"><span ng-bind="item.likes"></span></i><i class="w3-right"><img src="icons/004-thumb-down.png" class="w3-button" ng-click="unlike(item.src)"><span ng-bind="item.unlikes"></span></i></span>' 
    }
})