import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('https://mst-full-stack-dev-test.herokuapp.com/');
  }

  // This is done with Observable also 
  // on(eventName: string): Observable<any> {
  //   return new Observable<any>(observer => {
  //     this.socket.on(eventName, data => observer.next(data));
  //   });
  // }

  on(eventName: string): Observable<any> {
    return fromEvent(this.socket, eventName); // This is done with RXJS operator fromEvent
  }

  // // Check if the socket is connected
  // isConnected(): boolean {
  //   return this.socket.connected;
  // }

  // // Check if the socket is disconnected
  // isDisconnected(): boolean {
  //   return !this.socket.connected;
  // }
}

