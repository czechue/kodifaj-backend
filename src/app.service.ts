import { Injectable } from '@nestjs/common';

export interface Project {
  id: string;
}

@Injectable()
export class AppService {
  getHello(): Project[] {
    return [
      {id: '1'},
      {id: '2'},
      {id: '3'},
      {id: '4'},
      {id: '5'},
      {id: '6'},
      {id: '7'},
      {id: '8'},
      {id: '9'},
      {id: '10'},
      {id: '11'},
      ];
  }
}
