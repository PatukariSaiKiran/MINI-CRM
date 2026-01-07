import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, observeOn } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // ✅ key fix: async emission + avoid duplicates
  loading$ = this.loadingSubject.asObservable().pipe(
    distinctUntilChanged(),
    observeOn(asyncScheduler)
  );

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
