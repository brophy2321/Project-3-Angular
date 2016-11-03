.controller( "CommentEditController", [
  "CommentFactory",
  "$stateParams",
  CommentEditControllerFunction
]);

function CommentEditControllerFunction( CommentFactory, $stateParams ){
this.comment = CommentFactory.get({id: $stateParams.id});
this.update = function(){
  this.comment.$update({id: $stateParams.id})
}
this.destroy = function(){
      this.comment.$delete({id: $stateParams.id});
    }
}
