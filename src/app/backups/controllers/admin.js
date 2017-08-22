angular
.module('BloggingApp')
.controller('adminController',['Stats','Posts','Categories','$http','$uibModal',function(Stats,Posts,Categories,$http,$uibModal){
  var vm = this;
  Dropzone.autoDiscover = false;

  vm.activeView = 'posts';

  vm.visitorChart = {};
  vm.visitorChart.type = "GeoChart";
  vm.visitorChart.loaded = false;
  vm.visitorChart.options = {
    colorAxis: {colors: ['#f486a9', '#d73925']},
    displayMode: 'markers'
    // dataMode: 'markers'
  };

  vm.deviceChart = {};
  vm.deviceChart.type = "PieChart";
  vm.deviceChart.loaded = false;
  vm.deviceChart.options = {

  };

  vm.osChart = {};
  vm.osChart.type = "PieChart";
  vm.osChart.loaded = false;
  vm.osChart.options = {

  };

  vm.platformChart = {};
  vm.platformChart.type = "PieChart";
  vm.platformChart.loaded = false;
  vm.platformChart.options = {

  };

  vm.chromeChart = {};
  vm.chromeChart.type = "PieChart";
  vm.chromeChart.loaded = false;
  vm.chromeChart.data = [
    ['Version','Hits']
  ];
  vm.chromeChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.firefoxChart = {};
  vm.firefoxChart.type = "PieChart";
  vm.firefoxChart.loaded = false;
  vm.firefoxChart.data = [
    ['Version','Hits']
  ];
  vm.firefoxChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.operaChart = {};
  vm.operaChart.type = "PieChart";
  vm.operaChart.loaded = false;
  vm.operaChart.data = [
    ['Version','Hits']
  ];
  vm.operaChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.IEChart = {};
  vm.IEChart.type = "PieChart";
  vm.IEChart.loaded = false;
  vm.IEChart.data = [
    ['Version','Hits']
  ];
  vm.IEChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.safariChart = {};
  vm.safariChart.type = "PieChart";
  vm.safariChart.loaded = false;
  vm.safariChart.data = [
    ['Version','Hits']
  ];
  vm.safariChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };


  vm.uploaderTemplate = `
    <div class="dz-preview dz-file-preview">
      <div class="clearfix">
        <div class="dz-image">
          <div class="dz-success-mark">
            <i class="icon-check"></i>
          </div>
          <div class="dz-error-mark">
            <i class="icon-cross"></i>
          </div>
          <img class="img-responsive" data-dz-thumbnail />
        </div>
        <div class="dz-details">
            <div class="dz-filename">
              <span data-dz-name></span>
            </div>
            <div class="dz-size small">
              <span data-dz-size></span>
            </div>
        </div>
      </div>
      <div class="progress progress-xs active dz-progress">
        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress>
      </div>
      </div>
      <div class="dz-error-message">
        <span data-dz-errormessage></span>
      </div>
    </div>
  `


  Stats.countries().then(function(response){
    // console.log(response.data.countries);
    vm.visitorChart.data = [
      ['Country', 'Hits']
    ];
    for (var i = 0; i < response.data.length; i++) {
      vm.visitorChart.data.push(
        [response.data[i].country, response.data[i].count]
      )
    }
  })

  Stats.os().then(function(response){
    vm.osChart.data = [
      ['OS', 'hits']
    ];
    for (var i = 0; i < response.data.length; i++) {
      vm.osChart.data.push(
        [response.data[i]._id.os, response.data[i].count]
      )
    }
 });

 Stats.platform().then(function(response){
   vm.platformChart.data = [
     ['Platform', 'hits']
   ];
   for (var i = 0; i < response.data.length; i++) {
     vm.platformChart.data.push(
       [response.data[i]._id.platform, response.data[i].count]
     )
   }
});
//
Stats.devices().then(function(response){
  vm.deviceChart.data = [
    ['Device', 'hits']
  ];
  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i]._id.desktop){
      vm.deviceChart.data.push(
        ['Desktop', response.data[i].count]
      )
    } else if (response.data[i]._id.tablet){
        vm.deviceChart.data.push(
          ['Tablet', response.data[i].count]
      )
    }else if (response.data[i]._id.mobile){
        vm.deviceChart.data.push(
          ['Mobile', response.data[i].count]
        )
    }
  }
});


Stats.browser().then(function(response){

  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i]._id.chrome){
      vm.chromeChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.firefox){
      vm.firefoxChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.edge){
      vm.IEChart.data.push(
        ['Edge '+parseInt(response.data[i]._id.version), response.data[i].count]
      )
    }
    else if (response.data[i]._id.ie){
      vm.IEChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.opera){
      vm.operaChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.safari){
      vm.safariChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
  }

});

vm.resetPostForm = function(){
  vm.postContent = {};
  vm.formContent.$setPristine();
  vm.formContent.$setUntouched();
  vm.coverDropzoneActive = false;
}

vm.sendPost = function(){
  if(vm.postContent.edit != true){
    $http.post('/submit-post',{
      title : vm.postContent.title,
      body : vm.postContent.body,
      category : vm.postContent.category,
      cover: vm.articleCover
    }).then(function(){
      vm.resetPostForm();
      vm.fetchposts();
      vm.fetchCategories();
    },function(){

    })
  } else {
    $http.put(`/edit-post?category=${vm.postContent.category}&postId=${vm.postContent.id}&body=${vm.postContent.body}`).then(function(){
      vm.resetPostForm();
      vm.fetchposts();
      vm.fetchCategories();
    },function(){

    })
  }
}

vm.editPost = function(id){
  console.log(id);
  $http.post('/edit-post',{
    'postId': id
  }).then(function(response){
    vm.postContent = {
      id: response.data.postId,
      title:response.data.title,
      body:response.data.body,
      category:response.data.category,
      edit: true
    }
    console.log(vm.postContent)
  },function(){

  })
}

vm.deletePostConfirm = function(post){
    vm.modalInstance = $uibModal.open({
      controller: ['$uibModalInstance',function($uibModalInstance){
        var $modal = this;
        $modal.post = post;

        $modal.close = function () {
          $uibModalInstance.close();
        }

        $modal.ok = function () {
          $uibModalInstance.close();
          vm.deletePost(post);
        }

      }],
      controllerAs: '$modal',
      templateUrl: 'templates/modal-delete-article.html'
    })
  }
  vm.deletePost = function(post){
    $http.delete(`/post?category=${post.category}&postId=${post.postId}`).then(function(){
      console.log('deletePost')
      vm.fetchposts();
      vm.fetchCategories();
    },function(){

    })
}

vm.fetchposts = function(){
  Posts.getPosts('all',0,0).then(function(response){
    vm.postList = response.data;
  })
}
vm.fetchCategories = function(){
  Categories.getCategories().then(function(response){
    vm.categories = response.data
  })
}
vm.fetchGallery = function(){
  Posts.imageGallery().then(function(response){
    vm.gallery = response.data
  })
}

vm.subcategories = [];

vm.removeSubcategory = function(index){
  vm.subcategories.splice(index,1);
};

vm.addSubcategory = function(){
  vm.subCategoryError = '';
  if (vm.subcategories.indexOf(vm.subCategoryName) == -1) {
    vm.subcategories.push(vm.subCategoryName);
    vm.subCategoryName = '';
    vm.categoryform.subcategory.$setPristine();
  } else if (vm.subcategories.indexOf(vm.subCategoryName) > -1){
    vm.subCategoryError = 'This subcategory already exists'
    vm.categoryform.subcategory.$setValidity('duplicate', false)
  }

};

vm.createCategory = function(){
  $http.put('./categories',{
    "category":vm.categoryName,
    "subcategories":vm.subcategories
  }).then(
    function(){
      vm.fetchCategories();
    },
    function(){}
  )
}

vm.postEditTag = function(){
    $http.post('').then(function(){

    }, function(){

    })
};

vm.articleCover = null;

vm.dzCallbacks = {
  'success':function(file){
    vm.articleCover = file.name.toLowerCase()
                            .replace(/[,\!&?#<$+%>`*'|{"=}/:@]/g,"")
                            .replace(/[-\s]/g,"_");
  },
  'removedfile':function(file){
    if(file.accepted){
      var sanitizedFileName = file.name.toLowerCase()
                            .replace(/[,\!&?#<$+%>`*'|{"=}/:@]/g,"")
                            .replace(/[-\s]/g,"_");
      $http.delete(`/uploads/article/cover?filename=${sanitizedFileName}`).then(function(reponse){
        console.log('delete file');
        vm.articleCover = null;
    },function(){

    })}
  }
}

vm.coverDropzoneActive = false;

vm.coverDropzoneActivator = function(){
  if(!vm.postContent.title.$pristine){
    vm.coverDropzoneActive = true;
  }
}

vm.dzOptions = {
  url : `/uploads/article/cover`,
  paramName : 'photo',
  maxFilesize : '10',
  acceptedFiles : 'image/jpeg, images/jpg, image/png',
  addRemoveLinks : true,
  thumbnailWidth: 120,
  thumbnailHeight: 120,
  maxFiles: 1,
  previewTemplate: vm.uploaderTemplate
};

vm.galleryDzOptions = {
  url : `/uploads`,
  paramName : 'photo',
  maxFilesize : '10',
  acceptedFiles : 'image/jpeg, images/jpg, image/png',
  addRemoveLinks : true,
  thumbnailWidth: 120,
  thumbnailHeight: 120,
  maxFiles: 10,
  autoProcessQueue: false,
  parallelUploads: 10,
  previewTemplate: vm.uploaderTemplate
};

vm.articleAssociatedToImage = null;

vm.uploadGallery = function(){
  vm.galleryDzMethods.getDropzone().options.url = `/uploads?article=${vm.articleAssociatedToImage}`
  vm.galleryDzMethods.processQueue();
  // $http.put(`/uploads?article=${vm.articleAssociatedToImage}`).then(function(response){

  // })
}
vm.fetchposts();
vm.fetchCategories();
vm.fetchGallery();


}])
