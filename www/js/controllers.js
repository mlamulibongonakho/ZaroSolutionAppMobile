var variable1;
angular.module('starter.controllers', [])

.controller("mainCtrl",function($scope, $location, $http, $timeout,$ionicPopover, $ionicPopup, $ionicLoading, $stateParams, userService,$rootScope)
{

	$scope.loginData={};
	

	$scope.go=function( reg )
	{
		$location.path( reg );
	}

	$scope.login=function(path)
	{
		
		//$ionicLoading.hide();
		var object={
			email:$scope.loginData.email,
			password:$scope.loginData.password
		}
		var parameter = JSON.stringify(object);
		var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            };
		var res =$http.post("http://localhost:8080/User/login",parameter,config);
			
		res.success(function(data){

			if(data.bad ==true && data.user==null)
			{  
				
				
				$ionicLoading.hide();
				$scope.showAlert('Warning',data.response);
			}
			else if(data.bad=true && data.user !=null)
			{
				userService.getUser(data.user.id) 
					.then(function(user){
	              })
				sessionStorage.setItem('loggedin', JSON.stringify(data.user.id));
				$scope.loginData.email="";
				$scope.loginData.password="";
				 $location.path(path);

				 
			}

			
		});
		res.error(function(data){
			console.log(data);
		});

	}

	// An alert dialog
	 $scope.showAlert = function(title, msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: title,
		 template: msg
	   });
	 };
  //--------------------------------------------
})
.controller("regCtrl",function($state,$scope,$location,$http,$timeout,$ionicPopover, $ionicPopup, $ionicLoading)
{
	$scope.regData={}

	
	
	$scope.register=function() {
		
			var object = {

			firstName : $scope.regData.name,
	    	lastName : $scope.regData.surname,
	    	email : $scope.regData.email,
	    	cellnumber : $scope.regData.cellnumber,
	    	password : $scope.regData.password,
	    	gender:$scope.regData.gender
		};
		var parameter = JSON.stringify(object);
		var response=$http.post("http://localhost:8080/User/save",parameter)
		response.success(function(data){
			//$scope.showAlert("Successfull Registered");
			
			if(data.bad==true && data.user !=null)
			{
				$ionicLoading.hide();

				$scope.showAlert('Warning',data.response);
			}
			else{
				
				$scope.regData.name="";
				$scope.regData.surname="";
				$scope.regData.cellnumber="";
				$scope.regData.email="";
				$scope.regData.password="";
				$scope.regData.confpassword="";
				$scope.showAlert('Successfull',data.response+"\n your otp Code for Verification is :"+data.otpCode);
				$timeout(function () {

					$state.go('verifyPin');
				      
				  }, 1000);
				
				//console.log(Math.floor(100000 + Math.random()*900000));
			}
			
		});
		response.error(function(data){
			console.log(data);
		});


		
		//
		
	}
	// An alert dialog
	 $scope.showAlert = function(title, msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: title,
		 template: msg
	   });
	 };
  //--------------------------------------------


})

.controller("profileCtrl",function($scope,$http, $stateParams, userService,$rootScope, $location,$ionicPopover, $ionicPopup)
{
	$scope.dData=true;

	var id=sessionStorage.getItem("loggedin");
	userService.getUser(id) 
			.then(function(user){

			$scope.profileData=user;
	})

	$scope.logout=function()
	{
		sessionStorage.removeItem("emailLogin");
		sessionStorage.removeItem("loggedin");
		$location.path('#/');
	}
$scope.btnEnable=function(){
			$scope.dData=false;

		}
	$scope.update=function(){
		var object = {

			firstName : $scope.profileData.firstName,
	    	lastName : $scope.profileData.lastName,
	    	email : $scope.profileData.email,
	    	cellnumber : $scope.profileData.cellnumber
		};
		var parameter = JSON.stringify(object);
		var request=$http.post("http://localhost:8080/User/update",parameter)
		request.success(function(data){

			if(data.bad==false)
			 {
				$scope.showAlert('Successfull',data.response);
			 }
			 else if(data.bad==true)
			 {
			 	$scope.showAlert('Warning',data.response);
			 }
		})
		
	}

	// An alert dialog
	 $scope.showAlert = function(title, msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: title,
		 template: msg
	   });
	 };
  //--------------------------------------------

})

.controller("verifyCtrl",function($scope,$http,$state,$ionicPopover, $ionicPopup,$location){
$scope.verifyData={};
	$scope.verify=function(){
		var object = {
	    	email : $scope.verifyData.email,
	    	otpCode : $scope.verifyData.otpCode
		};
		var parameter = JSON.stringify(object);

		console.log(parameter);

		var request=$http.post("http://localhost:8080/User/otpValidate",parameter)
		request.success(function(data){
			console.log(data);

			if(data.found==false && data.bad==true)
			 {
				$scope.showAlert('Warning !!',data.response);

			 }
			 else if(data.found==true && data.bad==true){
			 	$scope.showAlert('Warning !!',data.response);
			 }
			 else if(data.found==true && data.bad==false)
			 {
			 	$scope.showAlert('Successfull',data.response);
			 	$scope.verifyData.email="";
	    		$scope.verifyData.otpCode="";
			 	$location.path('#/');
			 }
			 else{
			 	$scope.showAlert('Warning !!',data.response);
			 }
		})

	}
	// An alert dialog
	 $scope.showAlert = function(title, msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: title,
		 template: msg
	   });
	 };
  //--------------------------------------------
	

})
.controller("fpasswordCtrl",function($scope){


})


