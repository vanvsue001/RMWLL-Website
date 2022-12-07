/*app_controller.js
This is largely the same as LMS2 but refactored to use module pattern.
*/

//import LocalStorageService from "../models/local_storage_service.js";
import LocalStorageService from "../models/storageService/local_storage_service.js";
import RestStorageService from "../models/storageService/rest_storage_service.js";
import ListView from "../views/list_view.js";
import listViewModel from '../views/view_models/teams_page_view_model.js'   //TODO: you will need to create this
import GenericView from "../views/generic_view.js"
import HomeViewModel from '../views/view_models/home_page_view_model.js'   //TODO: you will need to create this
import Router from '../routers/router.js' //TODO: instantiate 

export default class AppController {
  constructor(appViewModel) {
    this.appViewModel = appViewModel;
    this.router = new Router(window, appViewModel.routes, appViewModel.navContainerId, appViewModel.navTemplateUrl)
    //event pattern, decouples the router and controller

    $("body").on("loadView", (event, route) => {console.log(route), this.loadView(route);}) //listen for trigger
    
    // //TODO: get rid of this
    // //REST STORAGE SERVICE 
    // this.storageService = new RestStorageService( 
    //   this.entity,
    //   this.entitySingle, 
    //   this.list.options, 
    //   this.endPoint
    // );

    //TODO: git rid of old
    /*
    this.listView = new ListView(
      this.storageService,
      this.appViewModel.viewModel
    );
    */

  }

  get $containerId() {
    return $(`#${this.appViewModel.containerId}`)
  }

  loadView(route) {
      this.$containerId.empty(); //empty app container

      switch (route.viewType) {
          case "generic":
              //TODO
              //Instantiate your GenericView to render your home page html
              let genericView = new GenericView(HomeViewModel);//has url for home page
              //render the view
              genericView.renderHome();
              break;
          case "list":
              let storageService = new RestStorageService( 
              this.entity,
              this.entitySingle, 
              listViewModel.list.options, 
              this.endPoint
              );
              //Instantiate RestStorageService and ListView using the data found in the route
              let listView = new ListView(storageService, listViewModel);//has url for home page
              //render the view
              listView.render();
              //render the view

              break;
      }
  }



  //TODO: get rid of 
  
  get data() {
    return this.appViewModel.viewModel.data;
  }

  get lookups(){
    return this.appViewModel.viewModel.lookups;
  }
  get entity() {
    console.log(this.appViewModel);
    return this.appViewModel.viewModel.entity;
  }
  get entitySingle() {
    return this.appViewModel.viewModel.entitySingle;
  }
  get list() {
    return this.appViewModel.viewModel.list;
  }
  get listViewModel() {
    return this.appViewModel.viewModel;
  }
  get endPoint() {
    return this.appViewModel.endPoint;
  }

  // async reset() {
  //   await this.listView.reset();
  // }

  // async render() {
  //   await this.listView.render();
  // }
  

}
