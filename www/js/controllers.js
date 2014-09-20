

//--vikki

angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $q, $ionicLoading) {

  $scope.initMapAutoSuggest = function () {
    google.maps.event.addDomListener(window,"load", doGoogleSuggestInit )
  }

  function doGoogleSuggestInit() {
    var source = document.getElementById('source');
    var dest = document.getElementById('destination'); 
    var options = {componentRestrictions: {country: 'in'} }
    new google.maps.places.Autocomplete(source, options);
    new google.maps.places.Autocomplete(dest, options);
  }


  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.generateRoute = function () {
    //debugger
    // needs refactor
    $scope.source = document.getElementById("source").value
    $scope.destination = document.getElementById("destination").value

    console.log("generate");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Generating route',
      showBackdrop: false
    });
    var sourceGeocoding = $q.defer()
    var destGeocoding = $q.defer()
    var allGeocoding = $q.all([sourceGeocoding.promise, destGeocoding.promise])
    allGeocoding.then(plotMap);

    sourceLatlng = geocodeAddress("source")
    destLatLng = geocodeAddress("dest")
    
    function plotMap(){
      var request = {
        // origin: new google.maps.LatLng(sourceLatlng.k, sourceLatlng.B),
        // destination: new google.maps.LatLng(destLatLng.k, destLatLng.B),
        origin: sourceLatlng,
        destination: destLatLng,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        //debugger
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          console.log("directionsService err")
        }
        $scope.loading.hide();
      });  
    }
    

    function geocodeAddress(type) {
      address = (type == "source"? $scope.source : $scope.destination)
      geocoder.geocode( { 'address': address, region: 'IN'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latLng = results[0].geometry.location
        if(type == "source") {
          sourceLatlng = latLng
          sourceGeocoding.resolve(type+"Geocoding done!")
        } else {
          destLatLng = latLng
          destGeocoding.resolve(type+"Geocoding done!")
        }
        console.log(latLng)

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  };


});
