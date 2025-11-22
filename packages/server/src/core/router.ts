import { Events } from "./types";

// function EventsRouter<T>(value: T):T {
//     return value
// }



// class EventsRouter{
//     constructor(){
//         this.handlers = {};
//     }

//     on (event,handler){
//         this.handlers[event] = handler
//     }

//     handle(event,data,client){
//       const handler = this.handlers[event] 

//       if(handler) handler(data,client)=>{

//       }
//     }
// }

//const router = new EventsRouter();
// router {
//     handlers = {
//.       ping: function(data,client)}
// }

//ping , this.handlers[event] = this.handler

class EventsRouter {
    private handlers : Record <string, (data:any , client: any)=> void > 
}