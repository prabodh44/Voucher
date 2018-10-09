// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwXRuqsMUZS0AnDBpMlZTCAH5Hli9aF5o",
    authDomain: "voucher-50570.firebaseapp.com",
    databaseURL: "https://voucher-50570.firebaseio.com",
    projectId: "voucher-50570",
    storageBucket: "voucher-50570.appspot.com",
    messagingSenderId: "517562225371"
};

//initialize firebase
firebase.initializeApp(config);

//database instance
var database = firebase.database();


var Voucher = angular.module('Voucher', ['ngMaterial', 'ngMessages']);
Voucher.controller('MainController', function ($scope, $http) {
    
    //root database reference

    var rootRef = database.ref();
    
    var self = this;
    var namesArray = [];

    loadAll();


    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;

    function querySearch(query) {
        var results = query ? namesArray.filter(createFilterFor(query)) : namesArray;
        return results;
    }

    function loadAll() {
        var userRef = rootRef.child('users');
        userRef.on('child_added', function(snapshot){
                namesArray.push(snapshot.val()["username"]);
            console.log(namesArray);
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        //var lowercaseQuery = query.toLowerCase();

        return function filterFn(data) {
            return (data.indexOf(query) === 0);
        };

    }

   

    $scope.addUser = function (username) {
        var userRef = rootRef.child('users');

        var obj = {
            username: username,
            date: new Date().toDateString(),
        };

       userRef.push().set(obj);
    }

    $scope.saveData = function (username, amount) {
        var userRef = rootRef.child('transactions');
        var obj = {
            username: username,
            amount: amount,
            date: new Date().toDateString()
        };
        userRef.push().set(obj);
    }   


    $scope.readData = function () {
        var rootRef = database.ref();
        var transRef = rootRef.child('transactions');
    //     userRef.once('value')
    //     .then(function(snapshot){
    //         for(var key in snapshot.val()){
    //             $scope.results.push(snapshot.val()[key]);
    //         }
    //     });

    rootRef.orderByChild('transactions').equalTo('amount').once('value', function(snapshot){
        console.log(snapshot);
        var a = "a";
    });
    }

    

});