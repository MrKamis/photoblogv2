let app = angular.module('photoBlog', ['ngFileUpload'])
.controller('navBar', ['$scope', '$rootScope', '$location', '$window', ($scope, $rootScope, $location, $window) => {
    $scope.active = 'w3-bottombar w3-border-yellow';
    $scope.deactive = '';
    $scope.start = (url) => {
        //$location.url('kolekcja');
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
    angular.element(() => {
        if(angular.element('header')[0].clientWidth <= 601){
            $scope.mobile = true;
        }else{
            $scope.mobile = false;
        }
    })
}])
.controller('content', ['$scope', '$http', 'Upload', '$location', '$timeout', '$window', ($scope, $http, $upload, $location, $timeout, $window) => {
    $scope.currentPage = 'kolekcja';
    $scope.logged = {
        logged: false
    };
    $scope.sPic = [];
    $scope.aPic = [];
    $scope.loginForm = '';
    $scope.registerFormLogin = ''
    $scope.registerFormRepeatPassword = '';
    $scope.loading = '';
    $scope.fileName;
    $scope.file;
    $scope.fileTitle = {
        title: ''
    }
    $scope.user = {
        lLogin: '',
        lPassword: '',
        rLogin: '',
        rPassword: '',
        rRepeatPassword: '',
        rEmail: ''
    }
    $scope.loggedUser = {
        login: false,
        permissions: '1 - only likes/unlikes'
    }
    $scope.showModalPic = false;
    $scope.pages = [];
    $scope.notification = {
        turn: false,
        title: 'Powiadomienie',
        content: 'Test powiadomienia',
        addInfo: 'none',
        type: 'green',
        close: () => {
            $scope.notification.turn = false;
        },
        open: (title, content, addInfo = '', type = 'green') => {
            //console.log('???');
            $scope.notification.turn = true;
            $scope.notification.title = title;
            $scope.notification.content = content;
            $scope.notification.addInfo = addInfo;
            $scope.notification.type = type;
            return true;
        }
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
            //console.log(response.data)
            if(typeof(response) == 'object'){
                //console.log(response)
                $scope.aPic = response.data;

                $scope.goPage({
                    item: 1
                })

                let page = 1;
                $scope.pages.push(1);
                for(let x = 0; x < $scope.aPic.length; x++){
                    if(x%10 == 0){
                        $scope.pages.push(++page)
                    }
                }
                $scope.pages.pop();
            }else{
                throw 'Wystapil nieprzewidziany error!';
            }
        })
    };
    $scope.login = () => {
        if($scope.user.lLogin.search(/[<>]/) != -1){
            $scope.loginFormLogin = 'w3-border-red w3-bottombar';
            $scope.loginFormPassword = '';
            $scope.notification.open('Nieprawidłowe znaki w loginie!', 'Nie można używać takich znaków jak: <, >!', '', 'red');
            return false;
        }else if($scope.user.lLogin == "" || $scope.user.lPassword == ""){
            $scope.loginFormPassword = 'w3-border-red w3-bottom';
            $scope.loginFormLogin = 'w3-border-red w3-bottombar';
            $scope.notification.open('Zostawiłeś puste pola!', 'Musisz wypełnić wszystkie pola!', '', 'red');
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
                    $scope.loggedUser.login = $scope.user.lLogin;
                    $scope.logged.logged = true;
                    break;
                case '1':
                    $scope.logged.logged = false;
                    $scope.loginFormPassword = 'w3-border-red w3-bottombar';
                    $scope.loginFormLogin = '';
                    $scope.notification.open('Nieprawidłowe dane logowania!', 'Sprawdź, czy nie masz wcisniętego Caps-locka.', 'Żeby odzyskać hasło, napisz do kamis2k16@onet.pl', 'red');
                    break;
            }
            $scope.loading = '';
        })
    }
    $scope.register = () => {
        if($scope.user.rPassword != $scope.user.rRepeatPassword ){
            $scope.registerFormRepeatPassword = 'w3-border-red w3-bottombar';
            $scope.registerFormLogin = '';
            $scope.notification.open('Hasła się nie zgadzają', 'Twoje hasła nie są takie same w polach haseł!', '', 'red');
            return false;
        }else if($scope.user.rLogin.search(/[<>]/) != -1){
            $scope.registerFormLogin = 'w3-border-red w3-bottombar';
            $scope.registerFormRepeatPassword = '';
            $scope.notification.open('W loginie są niedozwolone znaki!', 'W loginie nie mogą pojawić się znaki: <, >!', '', 'red');
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
                        $scope.logged.logged = true;
                        break;
                    case '1':
                        $scope.registerFormRepeatPassword = 'w3-bottombar w3-border-red';
                        $scope.registerFormLogin = '';
                        $scope.notification.open('Hasła się nie zgadzają', 'Twoje hasła nie są takie same w polach haseł!', '', 'red');
                        break;
                    case '2':
                        $scope.registerFormLogin = 'w3-border-red w3-bottombar';
                        $scope.registerFormRepeatPassword = '';
                        $scope.notification.open('Taki użytkownik o takim loginie już istnieje!', 'Zmień login!', '', 'red');
                        break;
                }
                $scope.loading = '';
            })
        }
    }
    $scope.sendFile = () => {
        let file = $scope.file;
        if($scope.fileTitle.title == ''){
            $scope.fileTitle.error = 'w3-border-red w3-bottombar';
            $scope.notification.open('Puste pole tytułu zdjęcia', 'Nadaj tytuł zdjęciu!', '', 'yellow');
            return false;
        }else{
            $scope.fileTitle.error = '';
            $scope.notification.open('Trwa przesyłanie pliku, proszę czekać', 'Nie powinno zająć to długo czasu. Zależnie od rozmiaru zdjęcia.', 'W tym czasie możesz przeglądać kolekcje!', 'yellow');
        }
        //console.log(file)
        $upload.upload({
            url: 'php/sendFile.php',
            data: {
                title: $scope.fileTitle.title,
                file: file,
                author: $scope.loggedUser.login
            }
        })
        .then((response) => {
            switch(response.data){
                case 'complete':
                    $scope.fileTitle.title = '';
                    $scope.file = '';
                    $scope.start();
                    $scope.goPage(1);
                    $scope.notification.open('Wysłano plik!', 'Wysłano zdjęcie! Możesz przejśc do kolekcji by zobaczyć efekt!', '', 'green');
                    break;
                case '1':
                    console.log(response.data)
                    $scope.notification.open('Nie wybrałeś pliku źródłowego!', 'Pownieneś wybrać plik, który będzie przesłany!', '', 'red');
                    break;
                case '2':
                $scope.notification.open('Nie udało się przesłać pliku!', 'Prawdopodobnie spowodowane jest to słabym łączem intenrnetowym! Spróbuj ponownie później!', '', 'yellow');
                    break;
                case '3':
                    $scope.notification.open('Nie masz wystarczająych uprawnień do przesłania zdjęcia!', 'Musisz napisać do administratora, by przyznał Ci wystarczające uprawnienia! Email: kamis2k16@onet.pl', '', 'red');
                    break;
                default:

                    break;
            }
        })
    }
    $scope.like = id => {
        if(!$scope.loggedUser.login){
            return($scope.notification.open('Zdjecie mogą oceniać tylko zalogowaniu uzytkownicy!', 'By sie zarejestrować, przejdź do panelu!', '', 'red'));
        }
        //console.log(id)
        $http({
            method: 'POST',
            url: 'php/like.php',
            data: $.param({
                id: id,
                user: $scope.loggedUser.login
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            //console.log(response.data)
            switch(response.data){
                case 'complete':
                    for(let x = 0; x < $scope.sPic.length; x++){
                        if($scope.sPic[x].id == id){
                            $scope.sPic[x].likes++;
                            break;
                        }
                    }
                    break;
                case '1':
                    $scope.notification.open('Już oceniłeś to zdjęcie!', 'Oceniać można tylko raz!', '', 'yellow');
                    break;
            }
        })
    }
    $scope.unlike = id => {
        if(!$scope.loggedUser.login){

            return($scope.notification.open('Zdjecie mogą oceniać tylko zalogowaniu uzytkownicy!', 'By sie zarejestrować, przejdź do panelu!', '', 'red'));
        }
        //console.log(id)
        $http({
            method: 'POST',
            url: 'php/dislike.php',
            data: $.param({
                id: id,
                user: $scope.loggedUser.login
            }),
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            //console.log(response.data)
            switch(response.data){
                case 'complete':
                    for(let x = 0; x < $scope.sPic.length; x++){
                        if($scope.sPic[x].id == id){
                            $scope.sPic[x].unlikes++;
                            break;
                        }
                    }
                    break;
                case '1':
                    $scope.notification.open('Już oceniłeś to zdjęcie!', 'Oceniać można tylko raz!', '', 'yellow');
                    break;
            }
        })
    }
    $scope.goPage = (which) => {
        //console.log(which.item)
        $location.path('strona' + which.item);

        let item = parseInt(which.item) - 1;

        $scope.sPic = new Array();
        let tmp = 0;

        $window.scrollTo(0,0);

        for(let x = 0; x < $scope.aPic.length; x++){
            if(x >= item * 10){
                $scope.sPic.push($scope.aPic[x]);
                tmp++;
             }

            if(tmp == 10){
                break;
            }
        }

    }
    $scope.openPhoto = (which) => {
        $scope.showModalPic = true;
        $scope.modalPicSrc = which.Src;
    }
    angular.element(() => {
        if(angular.element('header')[0].clientWidth <= 601){
            $scope.mobile = true;
        }else{
            $scope.mobile = false;
        }
        //console.log($location.path())
        $scope.start();
        if($location.path() != ''){
            if($location.path().search('strona') != -1){
                let page = $location.path().slice(7);
                page = parseInt(page);
                $scope.goPage({
                    item: page
                });

                //console.log(page);
            }else{ 
                $location.path('strona1');
                $scope.goPage({
                    item: 1
                })
            }
        }else{
            $location.path('strona1');
            $scope.goPage({
                item: 1
            })
        }
    })
}])
.directive('myPhoto', () => {
    return{
        template: 
        '<div class="w3-row">' +
            '<div class="w3-col l2 s0 m0" style="opacity: 0;">ble</div>' +
            '<div class="w3-col l8 s12 m12 w3-card w3-padding">' +
                '<h3><span ng-bind="item.title"></span></h3>' +
                '<span class="w3-bar"><i class="w3-left"><img src="icons/002-avatar.png"></i><i ng-bind="item.author" class="w3-left"></i>  <i class="w3-right"><img src="icons/001-calendar.png"></i> <i class="w3-right" ng-bind="item.date"></i></span>' +
                '<img src="{{item.src}}" alt="{{item.title}}" class="w3-button" ng-click="openPhoto(item.src)" style="width: 100%;">' +
                '<span class="w3-bar"><i class="w3-left"><img src="icons/005-thumb-up.png" class="w3-button" ng-click="like(item.id)"><span ng-bind="item.likes"></span></i><i class="w3-right"><img src="icons/004-thumb-down.png" class="w3-button" ng-click="unlike(item.id)"><span ng-bind="item.unlikes"></span></i></span>' +
            '</div>' +
        '</div>'
    }
})