import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {
  }
  getData(query) {
    return this.http.get("https://www.googleapis.com/books/v1/volumes/?q="+query)
  }
}

