angular.module('starter.controllers', [])

.controller('MembersCtrl', function($scope, $ionicModal, $http, $stateParams, $rootScope, $location) {
	
	/*----------------------------------------------------------------------*
	 *--------------------------- INITIALISATION ---------------------------*
	 *----------------------------------------------------------------------*/
	
	var baseURL = "https://iswearbox.herokuapp.com"
	
	$rootScope.members = {};
	getMembers();

	/*----------------------------------------------------------------------*
	 *----------------------------- FUNCTIONS ------------------------------*
	 *----------------------------------------------------------------------*/
	
	//Increase the member debt
	//---------------------------------------------------
	$scope.increase = function (idt) {
		$http.put(baseURL +'/members/increase/'+idt, {})
		.success(function(data, status, headers, config){
			getMembers();
		})
		.error(function(data, status, headers, config){
		});
	};

	//Get the list of members
	//---------------------------------------------------
	function getMembers() {
		$http.get(baseURL +'/members')
		.success(function(data, status, headers, config){
			$rootScope.members = data;
		})
		.error(function(data, status, headers, config){
		});
	};
	
})

.controller('AdminCtrl', function($scope, $ionicModal, $http, $stateParams, $rootScope, $location) {
	
	/*----------------------------------------------------------------------*
	 *--------------------------- INITIALISATION ---------------------------*
	 *----------------------------------------------------------------------*/
	
	var baseURL = "https://iswearbox.herokuapp.com"
	
	$scope.idMember = $stateParams.idMember;

	$scope.amountTag = '';
	
	getMembers();
	getAmount();

	/*----------------------------------------------------------------------*
	 *----------------------------- FUNCTIONS ------------------------------*
	 *----------------------------------------------------------------------*/

	//Get the list of members
	//---------------------------------------------------
	function getMembers() {
		$http.get(baseURL +'/members')
		.success(function(data, status, headers, config){
			$rootScope.members = data;
		})
		.error(function(data, status, headers, config){
		});
	};

	//Get the penality amount
	//---------------------------------------------------
	function getAmount() {
		$http.get(baseURL +'/amount')
		.success(function(data, status, headers, config){
			$scope.amountTag = data;
		})
		.error(function(data, status, headers, config){
		});
	};
	
	// Function which manage the loading picture.
	//----------------------------------------------------------------------
	function chargementImage(s, h) {
		$(s).show();
		$(h).hide();
	}
	
    var pictureSource=navigator.camera.PictureSourceType;
    var destinationType=navigator.camera.DestinationType;
	
		//----------------------------------------------------------------------
	function updateImage(imageData) {
		//chargementImage('#span-load'+$scope.idImage,'#img'+$scope.idImage);
		
		var dataObj = {
			image64 : imageData
		};			
	
		$http.put(baseURL + '/members/image/' + $scope.idImage, dataObj)
		.success(function (data, status, headers, config) {
			getMembers();
			//chargementImage('#img'+$scope.idImage,'#span-load'+$scope.idImage);
		})
		.error(function (data, status, headers, config) {
            alert('Error: ' + data);
        });
	};
	
    // A button will call this function
    //-------------------------------------------------------------------------------
    $scope.capturePhoto = function (id) {
		$scope.idImage = id;
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(updateImage, onFail, { quality: 50, 
        destinationType: destinationType.DATA_URL, correctOrientation : true,
		targetWidth: 200, targetHeight: 200 });
      
    }

    // Get photo from PHOTOLIBRARY
    //---------------------------------------------------------------------
    $scope.getPhoto = function(id) {
    	$scope.idImage = id;
      // Retrieve image file location from specified source
      navigator.camera.getPicture(updateImage, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: pictureSource.PHOTOLIBRARY,
		targetWidth: 200, targetHeight: 200 });
      
    }
    
    // Called if something bad happens.
    //------------------------------------
    function onFail(message) {
      alert('Failed because: ' + message);
    }
	
	/*----------------------------------------------------------------------*
	 *-------------------------------- MODAL -------------------------------*
	 *----------------------------------------------------------------------*/
	
	// Form data for the modals
	$scope.modalData = {};

	/*--------------------------------MODIFY--------------------------------*/
	
	// Create the modify modal that we will use later
	$ionicModal.fromTemplateUrl('html/modifyMember.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalModify = modal;
	});

	// Triggered in the modify modal to close it
	$scope.closeModify = function() {
		$scope.modalModify.hide();
		$scope.modalData.id = '';
		$scope.modalData.name = '';
		$scope.modalData.firstname = '';
	};

	// Open the modify modal
	$scope.modify = function(id, name, firstname) {
		$scope.modalData.id = id;
		$scope.modalData.name = name;
		$scope.modalData.firstname = firstname;
		$scope.modalModify.show();
	};

	// Perform the modify action when the user submits the modify form
	$scope.doModify = function() {
		var dataObj = {
				name : $scope.modalData.name,
				firstname : $scope.modalData.firstname
		};			

 		$http.put(baseURL + '/members/name/' + $scope.modalData.id, dataObj)
		.success(function(data, status, headers, config){
			getMembers();
			$scope.modalData.id = '';
			$scope.modalData.name = '';
			$scope.modalData.firstname = '';
			$scope.closeModify();
		})
		.error(function(data, status, headers, config){
		});
	};
	
	
	/*-------------------------------DISCHARGE------------------------------*/
	
	// Create the discharge modal that we will use later
	$ionicModal.fromTemplateUrl('html/dischargeMember.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalDischarge = modal;
	});

	// Triggered in the discharge modal to close it
	$scope.closeDischarge = function() {
		$scope.modalDischarge.hide();
		$scope.modalData.id = '';
		$scope.modalData.name = '';
		$scope.modalData.firstname = '';
	};
	
	// Open the discharge modal
	$scope.discharge = function(id, name, firstname) {
		$scope.modalData.id = id;
		$scope.modalData.name = name;
		$scope.modalData.firstname = firstname;
		$scope.modalDischarge.show();
	};
	
	// Perform the discharge action when the user submits it
	$scope.doDischarge = function () {
		$http.put(baseURL + '/members/discharge/'+ $scope.modalData.id, {})
		.success(function(data, status, headers, config){
			getMembers();
			$scope.modalData.id = '';
			$scope.modalData.name = '';
			$scope.modalData.firstname = '';
			$scope.closeDischarge();
		})
		.error(function(data, status, headers, config){
		});
	};
	
	/*--------------------------------DELETE--------------------------------*/

	// Create the delete modal that we will use later
	$ionicModal.fromTemplateUrl('html/deleteMember.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalDelete = modal;
	});

	// Triggered in the delete modal to close it
	$scope.closeDelete = function() {
		$scope.modalDelete.hide();
		$scope.modalData.id = '';
		$scope.modalData.name = '';
		$scope.modalData.firstname = '';
	};
	
	// Open the delete modal
	$scope.delete = function(idx, id, name, firstname) {
		$scope.modalData.idx = idx;
		$scope.modalData.id = id;
		$scope.modalData.name = name;
		$scope.modalData.firstname = firstname;
		$scope.modalDelete.show();
	};
	
	//Deleted a member in the database through the server
	$scope.doDelete = function () {
		$scope.members.splice($scope.modalData.idx,1);
		$http.delete(baseURL + '/members/'+ $scope.modalData.id)
		.success(function(data, status, headers, config){
			getMembers();
			$scope.modalData.id = '';
			$scope.modalData.name = '';
			$scope.modalData.firstname = '';
			$scope.closeDelete();
			$location.path( "/app/admin" );
		})
		.error(function(data, status, headers, config){
		});
	};
	
	/*-------------------------------PENALITY-------------------------------*/
	
	// Create the penality modal that we will use later
	$ionicModal.fromTemplateUrl('html/modifyPenality.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalPenality = modal;
	});

	// Triggered in the penality modal to close it
	$scope.closePenality = function() {
		$scope.modalPenality.hide();
		$scope.modalData.penality = '';
	};
	
	// Open the penality modal
	$scope.penality = function() {
		$scope.modalData.penality = '';
		$scope.modalPenality.show();
	};
	
	// Perform the penality action when the user submits it
	$scope.doPenality = function () {

		var dataObj = {
			amount : $scope.modalData.penality
		};			

		$http.put(baseURL +'/user', dataObj)
		.success(function(data, status, headers, config){
			$scope.amountTag= $scope.modalData.penality
			$scope.modalData.penality = '';
			$scope.closePenality();
		})
		.error(function(data, status, headers, config){
		});
	};

	/*---------------------------------ADD----------------------------------*/
	
	// Create the add modal that we will use later
	$ionicModal.fromTemplateUrl('html/addMember.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modalAdd = modal;
	});

	// Triggered in the add modal to close it
	$scope.closeAdd = function() {
		$scope.modalAdd.hide();
		$scope.modalData.name = '';
		$scope.modalData.firstname = '';
	};

	// Open the add modal
	$scope.add = function() {
		$scope.modalData.name = '';
		$scope.modalData.firstname = '';
		$scope.modalAdd.show();
	};

	// Perform the add action when the user submits the modify form
	$scope.doAdd = function() {
		var dataObj = {
				name : $scope.modalData.name,
				firstname : $scope.modalData.firstname
		};			
 		$http.post(baseURL + '/members', dataObj)
		.success(function(data, status, headers, config){
			getMembers();
			$scope.modalData.name = '';
			$scope.modalData.firstname = '';
			$scope.closeAdd();
		})
		.error(function(data, status, headers, config){
		});
	};
})

.controller('LoginCtrl', function($scope, $state) {
	
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (str){
			return this.indexOf(str) == 0;
		};
	}
	 
	var urlGoogle = 'https://accounts.google.com/o/oauth2/auth?client_id=1059228714691-isee43o6gmjvd71bdol5m3deg5f5u7vu.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fiswearbox.herokuapp.com%2Foauth2callback%3Fclient_name%3DGoogle2Client&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code'
	
	$scope.login = function() {
		var ref = window.open(urlGoogle, '_blank', 'location=no');
		ref.addEventListener('loadstart', refLoadStart);
		
		var callbackURL = "https://iswearbox.herokuapp.com/user"
	 
		function refLoadStart(event) {
			if((event.url).startsWith(callbackURL)) {
			    window.location="index.html";
				ref.close();
			}
		}
	}
	
})

.controller('LogoutCtrl', function($scope, $http, $location, $state) {
	
	var baseURL = "https://iswearbox.herokuapp.com"
	
	$scope.logout = function() {
		$http.get(baseURL +'/logout')
		.success(function(data, status, headers, config){
			window.location="login.html";
		})
		.error(function(data, status, headers, config){
			alert('Error: ' + data);
		});
	}
	
});
