// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwXRuqsMUZS0AnDBpMlZTCAH5Hli9aF5o",
    authDomain: "voucher-50570.firebaseapp.com",
    databaseURL: "https://voucher-50570.firebaseio.com",
    projectId: "voucher-50570",
    storageBucket: "voucher-50570.appspot.com",
    messagingSenderId: "517562225371"
};

firebase.initializeApp(config);
var database = firebase.database();


var Voucher = angular.module('Voucher', ['ngMaterial', 'ngMessages']);
Voucher.controller('MainController', function ($scope, $http) {
    var self = this;
    var namesArray = [];

    loadAll();


    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? namesArray.filter(createFilterFor(query)) : namesArray;
        return results;
    }



    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        $http.get('data/data.json')
            .then(function (data) {
                console.log(data);
                namesArray = data.data;
            }, function (error) {
                console.log(error);
            });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        //var lowercaseQuery = query.toLowerCase();

        return function filterFn(state) {
            return (state.name.indexOf(query) === 0);
        };

    }

   

    $scope.addUser = function (username) {

        var ref = database.ref();
        var userRef = ref.child('users');

        var obj = {
            username: username,
            date: new Date().toDateString(),
        };

       // userRef.push().set(obj);
    }

    $scope.saveData = function (selectedItem, amount) {

        var rootRef = database.ref();
        var userRef = rootRef.child('users');
   
        // firebase.database().ref('users/' + "1234").set({
        //     username: selectedItem.name,
        //         amount: amount,
        //         date: new Date().toDateString()
        //   });
        var obj = {
            username: selectedItem.name,
            amount: amount,
            date: new Date().toDateString()
        };
        userRef.push().set(obj);
    }


    $scope.readData = function () {
        var rootRef = database.ref();
        var userRef = rootRef.child('users');
        userRef.once('value')
        .then(function(snapshot){
            for(var key in snapshot.val()){
                console.log(snapshot.val()[key]);
            }
        });
    }

});