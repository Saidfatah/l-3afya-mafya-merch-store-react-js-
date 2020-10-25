import { Subject } from 'rxjs';
const subject = new Subject();

//here where sending { event: eventTitle } , that way you can listen to diffrent events , for example 'INCREMENTED' you could even send values 
export const eventsService= {
    sendEvent: (title,value) => subject.next({ title,value}),
    clearEventNotification: () => subject.next(),
    getEventNotification: () => subject.asObservable()
};