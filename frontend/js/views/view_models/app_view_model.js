import homePageViewModel from './home_page_view_model.js' //TODO:implement
import teamsPageViewModel from "./teams_page_view_model.js";


// var appViewModel = {
//   viewModel: teamViewModel,
//   endPoint: "localhost:8080"
// };

let routes = [
  {
    name: "#home",
    title: "Home",
    defaultOptions:null,
    isDefaultView: true,
    viewType:"generic",
    viewModel: homePageViewModel
  },
  {
    name: "#teams",
    title: "Teams",
    defaultOptions: {sortCol:'name', sortDir:'asc'},
    viewType:"list",
    viewModel: teamsPageViewModel,
    isDefaultView: false
  }
]

//new appViewModel
let appViewModel= {
  containerId: "app_container",
  endPoint:"localhost:8080",
  routes: routes,
  navContainerId: "navContainer",
  navTemplateUrl: "js/views/partials/nav.ejs",  
  viewModel: teamsPageViewModel, //TODO ??
}

export default appViewModel;
