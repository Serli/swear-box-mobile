angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }*/
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "html/menu.html"
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "html/login.html"
      }
    }
  })
  
  .state('app.members', {
    url: "/members",
    views: {
      'menuContent': {
        templateUrl: "html/members.html",
        controller: 'MembersCtrl'
      }
    }
  })

  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "html/help.html"
      }
    }
  })
    .state('app.admin', {
      url: "/admin",
      views: {
        'menuContent': {
          templateUrl: "html/admin.html",
          controller: 'MembersCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/members/:idMember",
    views: {
      'menuContent': {
        templateUrl: "html/member.html",
        controller: 'MembersCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
  
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
