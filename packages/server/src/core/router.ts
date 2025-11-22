import { Events } from "./types";

export class EventsRouter<E>{
    private handlers : Partial<Record<keyof E, (data: any, client:any)=>void>> = {};

    on<K extends keyof E>(event: K , handler: (data: E[K], client:any)=> void){
          this.handlers[event] = handler;
    }

    handle<K extends keyof E>(event:K , data:E[K],client:any) {
        const handler = this.handlers[event]

        if(handler) handler(data , client);
    }
}



