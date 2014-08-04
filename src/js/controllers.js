angular.module('app.controllers', ['app.services', 'ui.bootstrap'])

.controller('MainCtrl',['$scope', 'firebaseRef', function($scope, firebaseRef) {
  var makeRrttData = function(array, propertyNameArray) {
    var result = [];
    var propertyName = propertyNameArray.shift();
    if (propertyName) {
      var resultArray = makeChildrenArray(array, propertyName);
      for (var index in resultArray) {
        result.push({
          "name" : index,
          "children" : makeRrttData(resultArray[index], propertyNameArray)
        });
      }
      propertyNameArray.unshift(propertyName);
    } else {
      return array;
    }
    return result;
  };

  var makeChildrenArray = function(array, propertyName) {
    var resultObj = {};
    for (var property in array) {
      var object = array[property];
      var propertyValue = object[propertyName];
      if (resultObj.hasOwnProperty(propertyValue)) {
        resultObj[propertyValue].push(object);
      } else {
        resultObj[propertyValue] = [object];
      }
    }
    return resultObj;
  };

  var drawD3 = function(root) {
    var diameter = 960;
    var tree = d3.layout.tree()
        .size([360, diameter / 2 - 120])
        .separation(function(a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });
    var diagonal = d3.svg.diagonal.radial()
        .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
    var svg = d3.select("div.container.main").append("svg")
        .attr("width", diameter)
        .attr("height", diameter - 150)
        .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
    var nodes = tree.nodes(root),
        links = tree.links(nodes);
    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });
    node.append("circle")
        .attr("r", 4.5);
    node.append("text")
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
        .text(function(d) { return d.name; });
    d3.select(self.frameElement).style("height", diameter - 150 + "px");
  };

  var libraryFirebaseRef = firebaseRef("library");
  libraryFirebaseRef.on("value", function(snapshot) {
    var list = snapshot.val();
    var result = {
      "name": "nvll",
      "children": makeRrttData(list, ["element","usage"])
    };
    drawD3(result);
  });
}])

.controller('ListCtrl', ['$scope', '$modal', 'syncData', function($scope, $modal, syncData) {
  $scope.library = syncData('library').$asArray();
  $scope.elementList = syncData('elements').$asArray();

  $scope.sortField = undefined;
  $scope.reverse = false;

  $scope.sort = function(fieldName) {
    if ($scope.sortField === fieldName) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.sortField = fieldName;
      $scope.reverse = false;
    }
  };

  $scope.isSortUp = function(fieldName) {
    return $scope.sortField === fieldName && !$scope.reverse;
  };

  $scope.isSortDown = function(fieldName) {
    return $scope.sortField === fieldName && $scope.reverse;
  };

  $scope.openLibraryModal = function(mode, id, index) {
    $scope.mode = mode;
    $scope.item = id ? syncData('library/' + id).$asObject() : {} ;
    $scope.currentIndex = index;

    $scope.modalInstance = $modal.open({
      templateUrl: 'partials/nvll.modal.tpl.html',
      scope: $scope
    });
  };

  $scope.createLibrary = function() {
    $scope.library.$add($scope.item).then(function() {
      $scope.item = null;
      $scope.modalInstance.close();
    });
  };

  $scope.updateLibrary = function() {
    $scope.item.$save().then(function() {
      $scope.modalInstance.close();
    });
  };

  $scope.deleteLibrary = function() {
    $scope.library.$remove($scope.currentIndex).then(function() {
      $scope.modalInstance.close();
    });
  };
}])

.controller('SettingCtrl', ['$scope', 'syncData', function($scope, syncData) {
  $scope.isCollapsed = true;
  $scope.elements = syncData('elements').$asArray();

  $scope.createElement = function() {
    $scope.elements.$add({
      name: $scope.newElement
    }).then(function() {
      $scope.newElement = '';
    });
  };

  $scope.deleteElement = function(index) {
    $scope.elements.$remove(index);
  };
}])

.controller('NavbarCtrl', ['$scope', 'FBSimpleLoginService', function($scope, FBSimpleLoginService) {
  $scope.fbLogout = function() {
    FBSimpleLoginService.logout();
  };
}])

.controller('AdminCtrl', ['$scope', 'FBSimpleLoginService', function($scope, FBSimpleLoginService) {
  $scope.fbLogin = function() {
    console.log($scope.user);
    FBSimpleLoginService.login(
      $scope.user.email,
      $scope.user.password
    );
  };
}]);