angular
.module("nda", [
  "ui.router",
  "ngResource",
])
.config([
  "$stateProvider",
  RouterFunction
])
.factory("CategoryFactory", [
  "$resource",
  CategoryFactoryFunction
])
.factory("DisasterFactory", [
  "$resource",
  DisasterFactoryFunction
])
.factory("CommentFactory", [
  "$resource",
  CommentFactoryFunction
])

.controller("CategoryIndexController", [
  "CategoryFactory",
  CategoryIndexControllerFunction
])
.controller("CategoryShowController", [
  "$stateParams",
  "CategoryFactory",
  CategoryShowControllerFunction
])
.controller("DisasterIndexController", [
  "DisasterFactory",
  DisasterIndexControllerFunction
])
.controller("DisasterShowController", [
  "$stateParams",
  "DisasterFactory",
  "CommentFactory",
  DisasterShowControllerFunction


])

.controller("CommentIndexController", [
  "CommentFactory",
  CommentIndexControllerFunction
])
.controller("CommentShowController", [
  "$stateParams",
  "CommentFactory",
  CommentShowControllerFunction
])
.controller("CommentNewController", [
  "CommentFactory",
  CommentNewControllerFunction
])



function CategoryFactoryFunction($resource){
  return $resource("http://localhost:3000/categories/:id.json");
}
function CategoryIndexControllerFunction(CategoryFactory) {
  this.categories = CategoryFactory.query();
}
function CategoryShowControllerFunction($stateParams, CategoryFactory){
  this.category = CategoryFactory.get({id: $stateParams.id});
}

function DisasterFactoryFunction($resource){
  return $resource("http://localhost:3000/disasters/:id.json")
}
function DisasterIndexControllerFunction(DisasterFactory){
  this.disaster = DisasterFactory.query();
}

function DisasterShowControllerFunction($stateParams, DisasterFactory, CommentFactory){
  var self = this
  this.disaster = DisasterFactory.get({id: $stateParams.id}, function(){
    self.comments = self.disaster.comments

  });
  this.comment = new CommentFactory();
  this.create = function(){
    this.comment.$save({disaster_id: $stateParams.id})

  }
}
  function CommentFactoryFunction($resource){
    return $resource("http://localhost:3000/disasters/:disaster_id/comments/:id.json", {},{
      update: {method: "PUT"}
    });
  }
  function CommentIndexControllerFunction(CommentFactory){
    this.comment = CommentFactory.query();
  }
  function CommentNewControllerFunction( CommentFactory ){
    this.comment = new CommentFactory();
    this.create = function(){
      this.comment.$save()
    }
  }
  function CommentShowControllerFunction($stateParams, CommentFactory){

    this.comment = CommentFactory.get({id: $stateParams.id});
  }

  function RouterFunction($stateProvider){
    $stateProvider
    .state("categoryIndex", {
      url: "/categories",
      templateUrl: "js/ng-views/categories/index.html",
      controller: "CategoryIndexController",
      controllerAs: "vm"
    })
    .state("categoryShow", {
      url: "/categories/:id",
      templateUrl: "js/ng-views/categories/show.html",
      controller: "CategoryShowController",
      controllerAs: "vm"
    })
    .state("disasterIndex", {
      url: "/disasters",
      templateUrl: "js/ng-views/disasters/index.html",
      controller: "DisasterIndexController",
      controllerAs: "vm"
    })
    .state("disasterShow", {
      url: "/disasters/:id",
      templateUrl: "js/ng-views/disasters/show.html",
      controller: "DisasterShowController",
      controllerAs: "vm"
    })
    .state("commentIndex", {
      url:"/disaster/comments/:id",
      templateUrl:"js/ng-views/disasters/comments/index.html",
      controller:"CommentIndexController",
      controllerAs:"vm"
    })
    .state("commentNew", {
      url:"/disaster/comments/new",
      templateUrl:"js/ng-views/disasters/comment/new.html",
      controller:"CommentNewController",
      controllerAs:"vm"
    })
    .state("commentShow", {
      url:"/disaster/comments/:id",
      templateUrl:"js/ng-views/disasters/comments/show.html",
      controller:"CommentShowController",
      controllerAs:"vm"
    })
  }
