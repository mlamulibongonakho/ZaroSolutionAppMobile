angular.module('starter.services', [])

.factory('userService', function($http) {
	var users = {};
	console.log("Hello World");
	return{
			getUser:function(id){
				console.log("Hello World");
				var pObject= $http.get("http://localhost:8080/User/findOne/"+id)
				.then(function(response)
				{
					console.log("Hello World");
					users=response.data;
					return users;
					
				},function(response)
				{
					console.log("Error");
					
					
				})
				return pObject;
				
			}
			
	}
})