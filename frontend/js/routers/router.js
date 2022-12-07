import Utils from '../util/utilities.js'
import viewData from '../views/view_models/home_page_view_model.js'
import appController from '../controllers/app_controller.js'
//import appViewModel from "../views/view_models/app_view_model.js"
/* Class Router-handles hash routing and nav link state for application */
export default class Router {
    constructor(window, routes, containerId, templateUrl) {
        this.window = window;
        this._routes = routes;
        this.templateUrl=templateUrl;
        this.containerId=containerId;
        this.utils = new Utils();
        //since the render is normally async, I'm using the async IIFE wrapper
        //you can just exercise the promise pattern if you like
        (async () => {  
            await this.init();
        })();
        
    }
    get routes() {
        return this._routes;
    }
    get defaultRoute() {
        return this._routes.find(r => r.isDefaultView);
    }
    get curRoute(){
        return this.routes.find(element => element.name == window.location.hash);;
    }
    get $container(){
        return $(`#${this.containerId}`);
    }
    async init() {
        /*TODO
        1. await the render of the nav

        2. target the nav links, mine use 'nav-link' class so that
        when they are clicked on, you remove all 'active' classes for the link, and add active class
        to the event's currentTarget element
        
        3. set the hashchange event on the 'window' and call loadHash

        4. set the default hash (call setDefaultHash) on the URL

        5. Call loadHash
        */
        await this.render(); //renders nav

        $(document).on('click','.nav-link', function(ev){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }
            else{
                //e.currentTarget
                $(this).addClass('active');
            }
        });

        window.addEventListener('hashchange', () => {
            console.log('The hash has changed!')
            this.loadHash();
        }, false);

        this.setDefaultHash();

        this.loadHash();

    }

    setDefaultHash() {
        let curRoute = this.defaultRoute;
        window.location.hash = curRoute.name;
    }

    loadHash() {  
        //trigger a 'loadView' event, passing the current route (this.curRoute) as data
        $("body").trigger("loadView", [this.curRoute]);
    }
    async render() {
        //call this.utils.getFileContents to get the template for the menu.
        //use the getter this.templateUrl for the file path, which is stored in appViewModel
        //render the nav html using ejs
        //stuff the result into this.$container
        //appViewModel
        //render the nav html using ejs
        //stuff the result into this.$container
     
        //NAVBAR
        const html = await this.utils.getFileContents(this.templateUrl);
        this.$container.html(ejs.render(html, viewData));
        this.$container.show();
        //await this.renderTemplate(this.$container, this.templateUrl, this.viewData); 
       
    }
}