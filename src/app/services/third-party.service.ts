import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ThridPartyService {
    constructor(
        private http: HttpClient
    ) {}

    getData(): Observable<any> {
        const url = 'https://opensheet.elk.sh/1jI9vumm-NGtuTTIThy0g83amMXvIk4e55hu5u9pXl98/missions';
        return this.http.get(url);
    }

}
