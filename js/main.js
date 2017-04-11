 var weatherApp=angular.module('weatherApp',['ngMaterial', 'ngMessages','material.svgAssetsCache'])

  weatherApp.controller('AppCtrl', function ($scope,$http,$mdColorPalette,$mdSidenav,$mdToast, $mdDialog, $timeout) {

    //get current locatio n


    $scope.weatherToday={}
       $scope.setWeather=function(city){
         var query="select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='Ashok Nagar,Bangalore') and u='c'";
         console.log("https://query.yahooapis.com/v1/public/yql?q="+query+"&format=json&env=store&//datatables.org/alltableswithkeys");
        $http.post("https://query.yahooapis.com/v1/public/yql?q="+query+"&format=json&env=store&//datatables.org/alltableswithkeys").then(function(res){
      console.log(res.data)
      $scope.weatherToday=res.data;
      
    });
       }


    $scope.onSuccess = function(position) {
      console.log(position)
          $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=true").then(function(res){
              $scope.setWeather(res.data.results[0].address_components[4].long_name+","+res.data.results[0].address_components[5].long_name);
          })
            // alert('Latitude: '          + position.coords.latitude          + '\n' +
            //       'Longitude: '         + position.coords.longitude         + '\n' +
            //       'Altitude: '          + position.coords.altitude          + '\n' +
            //       'Accuracy: '          + position.coords.accuracy          + '\n' +
            //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            //       'Heading: '           + position.coords.heading           + '\n' +
            //       'Speed: '             + position.coords.speed             + '\n' +
            //       'Timestamp: '         + position.timestamp                + '\n');
        }

        // onError Callback receives a PositionError object
        //
        $scope.onError=function(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        $timeout(function() {
          navigator.geolocation.getCurrentPosition($scope.onSuccess, $scope.onError);
        });




     $scope.toggleSidenav = function() {
        return $mdSidenav('left').toggle();
      };
      $scope.weatherToday=[];
     
       $scope.list = [
        {
          label: 'Phone Android',
          icon: 'phone_android',
          name: 'Phone Android'
        }, {
          label: 'Phone iPhone',
          icon: 'phone_iphone',
          name: 'Phone iPhone'
        }, {
          label: 'Laptop Windows',
          icon: 'laptop_windows',
          name: 'Laptop Windows'
        }, {
          label: 'Laptop Mac',
          icon: 'laptop_mac',
          name: 'Laptop Mac'
        }
      ];
       this.myDate = new Date();
        this.isOpen = false;
        $scope.status = '  ';
  $scope.customFullscreen = false;

 
function DialogController($scope, $mdDialog,$timeout, $q,$log) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    }



    $scope.simulateQuery = false;
    $scope.isDisabled    = false;

    // list of `state` value/display objects
    $scope.states        = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;

    $scope.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
          deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

    $scope.onSwipeLeft = function(ev) {
      console.log("swipe")
      alert('You swiped left!!');
    };

    $scope.onSwipeRight = function(ev) {
      alert('You swiped right!!');
    };
    $scope.onSwipeUp = function(ev) {
      alert('You swiped up!!');
    };

    $scope.onSwipeDown = function(ev) {
      alert('You swiped down!!');
    };








  }

  $scope.showAlert = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/location-search.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
  //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text=%22malur%22&format=json
  
         
    });
       
  weatherApp.directive('themePreview', function () {
    return {
      restrict: 'E',
      templateUrl: 'themePreview.tmpl.html',
      scope: {
        primary: '=',
        accent: '='
      },
      controller: function ($scope, $mdColors, $mdColorUtil) {
        $scope.getColor = function (color) {
          return $mdColorUtil.rgbaToHex($mdColors.getThemeColor(color))
        };
      }
    }
  })
  weatherApp.directive('mdJustified', function() {
    return {
      restrict : 'A',
      compile : function(element, attrs)  {
        var layoutDirection = 'layout-'+ (attrs.mdJustified || "row");

        element.removeAttr('md-justified');
        element.addClass(layoutDirection);
        element.addClass("layout-align-space-between-stretch");

        return angular.noop;
      }
    };
  });


