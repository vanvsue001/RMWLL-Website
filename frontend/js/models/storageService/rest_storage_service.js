/* RestStorageService Class template*/
import StorageService from './storage_service.js'

export default class RestStorageService extends StorageService {
    constructor(entity, entitySingle, options = {}, host) {
        super(null,null, entity, entitySingle, options);
            //data and lookups are from data base so intailized as null
        this.host = host;    //e.g, localhost:8080, from 'endPoint' in appViewModel
        
    } 

    //getters and settters
    get sortCol() {
        return super.sortCol;
    }
    set sortCol(col) {
        super.sortCol = col;
    }
    get sortDir() {
        return super.sortDir;
    }
    set sortDir(dir) {
        super.sortDir = dir;
    }

    

    get apiName(){return this.entity;}
    get hostPrefix(){
        return `http://${this.host}`
    }
    get apiUrl(){
        return `${this.hostPrefix}/${this.apiName}`; //localhost:8080/teams
    }
    
    async list(options = this.model.options) {

        let coachesList = await this.getLookup('coaches')
        let url = `${this.apiUrl}/${this.utils.getQueryString(options)}`;
        
        try {
            const response = await fetch(url);
            this.model.data = await response.json();
            let teamsList = this.model.data;

            teamsList.forEach(team => {
                if(team.coach_id){
                    let teamCoach = coachesList.find(coach => coach.coach_id === team.coach_id);
                    let coachName = teamCoach.coachName;
                    team.coachName = coachName
                }
            });
            return teamsList
        }
        catch (msg) {
            console.log(msg);
            throw (msg);
        }
    }

    async read(id) {
        let url = `${this.apiUrl}/${id}`;
        try{
            const response = await fetch(url);
            this.model.data = await response.json();
            return this.model.data;            
        }
        catch(err){
            console.log(err);
            throw(err);
        }
        
    }

    async update(id, postData) {
        let url = `${this.apiUrl}/${id}`;
        let body = JSON.stringify(postData)
        try{
            const response = await fetch(url,{  method: 'PUT',
                                                mode: 'cors', 
                                                headers: {
                                                'Content-Type': 'application/json'
                                                },
                                                body});
            this.model.data = await response.json();
            return this.model.data;            
        }
        catch(err){
            console.log(err);
            throw(err);
        }
    }

    async create(postData) {
        let url = `${this.apiUrl}`;
        let body = JSON.stringify(postData)
        try{
            const response = await fetch(url,{  method: 'POST',
                                                mode: 'cors',
                                                headers: {
                                                'Content-Type': 'application/json'
                                                },
                                                body});
            this.model.data = await response.json();
            return this.model.data;            
        }
        catch(err){
            console.log(err);
            throw(err);
        }
    }

    async delete(id) {
        let url = `${this.apiUrl}/${id}`;
        try{
            const response = await fetch(url,{  method: 'DELETE',
            mode: 'cors',
            });
            this.model.data = await response.json();
            return this.model.data;            
        }
        catch(err){
            console.log(err);
            throw(err);
        }
    }
    
    async getLookup(lookupName){
        let url = `${this.hostPrefix}/lookups/${lookupName}`;
        try{
            const response = await fetch(url);
            this.model.data = await response.json();
            return this.model.data;            
        }
        catch(err){
            console.log(err);
            throw(err);
        } 
    }
}