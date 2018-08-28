import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const mascotas = [
      { id: 11, name: 'Zeus' },
      { id: 12, name: 'Toby' },
      { id: 13, name: 'Antonio' },
      { id: 14, name: 'Lulu' },
      { id: 15, name: 'Pecas' },
      { id: 16, name: 'Simon' },
      { id: 17, name: 'Boronas' },
      { id: 18, name: 'Pilin' },
      { id: 19, name: 'Consul' },
      { id: 20, name: 'Mariscal' }
    ];
    return {mascotas};
  }
}