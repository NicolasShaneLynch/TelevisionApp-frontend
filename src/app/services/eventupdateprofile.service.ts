import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileUpdateService {
    private profileUpdatedSubject = new Subject<void>();

    // Metodo per emettere l'evento
    updateProfile() {
        this.profileUpdatedSubject.next();
    }

    // Metodo per permettere ai componenti di iscriversi all'evento
    onProfileUpdated(): Observable<void> {
        return this.profileUpdatedSubject.asObservable();
    }
}