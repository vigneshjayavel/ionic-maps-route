angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map;
// var sourceLatlng = new google.maps.LatLng(37.7699298, -122.4469157);
// var destLatLng = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
var sourceLatlng
var destLatLng
var geocoder = new google.maps.Geocoder();
var bangloreLatlng = new google.maps.LatLng(12.9715987, 77.59456269999998)