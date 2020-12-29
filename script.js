//const angular = require("angular");

var app = angular.module("blog-angular", []);
var controller = app.controller("baseController", ($scope, $http, $timeout)=>{

    $scope.blogs = []; 

    $scope.addingBlog = false;
    $scope.editingBlogIndex = -1;

    $scope.newBlog = {
        title: "",
        text: ""
    };

    $scope.editingBlog = {
        id: -1,
        title: "",
        text: ""
    };


    $scope.loadBlogs = () => {
        $http.get("/api/blogs").then((response) => {
            $scope.blogs = response.data.sort((a, b) => a.id - b.id);
        });   
    };
    $timeout(() => {
        $scope.loadBlogs();
    }, 0);

    
   
    //DELETE////////////////////////////////////////////////////////////////////
    $scope.deleteBlog = (index) => {
        $http.delete(`/api/blog/${$scope.blogs[index].id}`).then((response) => {
            $scope.blogs.splice(index, 1);
        });
    };
    ////////////////////////////////////////////////////////////////////////////





    $scope.startAddingBlog = () => {
        $scope.addingBlog = true;
    };
    
    $scope.cancelAddingBlog = () => {
        $scope.addingBlog = false;
        $scope.newBlog.title = "";
        $scope.newBlog.text = "";
    };

    $scope.addBlog = () => {
        $http.post(`/api/blog`, $scope.newBlog).then((response) => {
            $scope.blogs.push(response.data);
            $scope.newBlog.title = "";
            $scope.newBlog.text = "";
            $scope.addingBlog = false;
        });
    };



    $scope.startEditingBlog = (index) => {
        $scope.editingBlogIndex = index;
        $scope.editingBlog.id = $scope.blogs[index].id;  
        $scope.editingBlog.title = $scope.blogs[index].title;
        $scope.editingBlog.text = $scope.blogs[index].text;
    };
    $scope.editBlog = (index) => {
        $http.put(`/api/blog`, $scope.editingBlog).then((response) => {
            $scope.blogs[index].title = $scope.editingBlog.title;
            $scope.blogs[index].text = $scope.editingBlog.text;
            $scope.editingBlogIndex = -1;
        });
        
    };

    $scope.cancelEditingBlog = () => {
        $scope.editingBlogIndex = -1;
        $scope.editingBlog.title = "";
        $scope.editingBlog.text = "";
    };

    

    
});