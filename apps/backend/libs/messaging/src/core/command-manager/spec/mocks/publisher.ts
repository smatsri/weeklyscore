import { Observable, Observer, Subscription } from "rxjs";
import { IPublisher, Message } from "../../../types";

export class TestPublisher implements IPublisher {
  getEvents<T>(topic: string): Observable<Message<T>> {
    throw new Error("Method not implemented.");
  }


  publish<T>(topic: string, message: Message<T>): void {
  }


  subscribe<T>(topic: string, obs: Observer<Message<T>>): Subscription {
    throw new Error("Method not implemented.");
  }
}