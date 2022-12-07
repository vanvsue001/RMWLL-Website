export default class Utilities{
    constructor()
    {
       this.files={}
    }

    async getFileContents(url){
        if (!(url in this.files)){
            this.files[url]=await $.get(url);
        }
        return this.files[url]
     }

    cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    getQueryString(options = this.options) {     
        let queryString = `?sortCol=${options.sortCol}&sortDir=${options.sortDir}`

        if(options.limit){
            queryString += `&limit=${options.limit}`
        }
        if(options.offset){
            queryString += `&offset=${options.offset}`
        }
        if(options.filterCol){
            queryString += `&filterCol=${options.filterCol}`
        }
        if(options.filterStr){
            queryString += `&filterStr=${options.filterStr}`
        }
        return queryString
    }
}