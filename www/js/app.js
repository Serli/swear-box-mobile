angular.module('starter', ['ionic', 'starter.controllers'])


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
        templateUrl: "html/login.html",
		controller: 'LoginCtrl'
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
  
    .state('app.logout', {
    url: "/logout",
    views: {
      'menuContent': {
        templateUrl: "html/logout.html",
		controller: 'LogoutCtrl'
      }
    }
  })
  
    .state('app.admin', {
      url: "/admin",
      views: {
        'menuContent': {
          templateUrl: "html/admin.html",
          controller: 'AdminCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/members/:idMember",
    views: {
      'menuContent': {
        templateUrl: "html/member.html",
        controller: 'AdminCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/members');
  
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
