//TODO: do
//for the home page
/*
Create a GenericView and generic_view_model.js to 
support it.  Use this generic view to render your 
home page html
*/

import View from "./view.js";
import viewData from '../views/view_models/home_page_view_model.js'

export default class GenericView extends View {
    constructor(viewModel) {
      super(null , viewModel);//home_page_view_model.js
      this.entityViewModel = viewModel; //viewdata
    }

    get templateUrl() { //overrides parent 
      return this.viewModel.homePageTemplateUrl;
    }

    async renderHome() {
      //this.data = await this.getViewData();
      
      this.viewData = {
        view: this, //pass in the view itself so you can use view functions if you want
        viewModel: this.viewModel,
        data: this.data,
      };
      const html = await this.utils.getFileContents(this.templateUrl);

      this.$container.html(ejs.render(html, null)); //don't need viewData it's straight HTML
      this.$container.show();
    }
}

