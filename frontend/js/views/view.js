import RestStorageService from "../models/storageService/rest_storage_service.js";
import Utils from "../util/utilities.js";
export default class View {
  constructor(storage, viewModel) {
    this.storage = storage;
    this.viewModel = viewModel;

    this.utils = new Utils();
    this.data = null;
    this.listTemplateHtml = "";
    this.wrapperTemplateHtml = "";
  }
  get $alertContainer() {
    return $("#" + this.viewModel.alertContainerId);
  }
  get wrapperTemplateUrl() {
    return this.viewModel.wrapperTemplateUrl;
  }
  get hasWrapper() {
    return this.viewModel.wrapperTemplateUrl;
  }
  get $wrapperContainer() {
    return $("#" + this.viewModel.wrapperContainerId);
  }
  get $container() {
    return $("#" + this.viewModel.containerId);
  }
  get templateUrl() {
    return this.viewModel.templateUrl;
  }
  async render() {
    await this.renderWrapper();
    await this.renderItem();
  }

  async renderWrapper() {    
    this.viewData = {
      view: this,
      viewModel: this.viewModel,
      data: this.data,
    };
    this.$wrapperContainer.empty();
    await this.renderTemplate(
      this.$wrapperContainer,
      this.wrapperTemplateUrl,
      this.viewData
    );
    if(this.storage instanceof RestStorageService){
      $("#resetView").hide();
    }
    else{
      $("#resetView").show();
    }
    await this.bindWrapperEvents();
  }

  async renderItem() {
    this.data = await this.storage.list();
    this.viewData = {
      view: this, 
      viewModel: this.viewModel,
      data: this.data,
    };

    await this.renderTemplate(this.$container, this.templateUrl, this.viewData); 
    await this.bindItemEvents();
  }

  get wrapperTemplateUrl() {
    return this.viewModel.wrapperTemplateUrl;
  }
  get hasWrapper() {
    return this.viewModel.wrapperTemplateUrl;
  }

  get templateUrl() {
    return this.viewModel.templateUrl;
  }

  async renderTemplate(container, templateUrl, viewData) {
    container.empty().hide();
    const html = await this.utils.getFileContents(templateUrl);
    container.html(ejs.render(html, viewData));
    container.show();
  }

  async reset() {
    await this.storage.reset();
    await this.render();
  }
  async getViewData() {
    return await this.storage.list();
  }

  async getOneData(currentID) {
    return await this.storage.read(currentID);
  }

  /*readCachedItem()
  special function I added to get the currently cached item instead of reading it anew
  this will be more important later when we are reading from an API.  I don't want to go all the
  way out to the internet to get a value that is sitting in memory.
  I use it when rendering the popover and delete modal when the latest information is not really needed
  */
  readCachedItem(id) {
    return this.storage.getItem(id);
  }
}
