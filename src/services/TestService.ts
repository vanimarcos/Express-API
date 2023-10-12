import FakeData from '../entities/fakedata';

class TestService {
  private fakeRepo: FakeData[];

  constructor() {
    this.fakeRepo = [
      { id: 1, name: 'User One' },
      { id: 2, name: 'User Two' },
    ];
  }

  getAll(): FakeData[] {
    return this.fakeRepo;
  }

  getByID(): FakeData {
    return this.fakeRepo[1];
  }

  create(): FakeData {
    return this.fakeRepo[0];
  }

  update(): FakeData {
    return this.fakeRepo[0];
  }

  delete(): boolean {
    return false;
  }
}

export default TestService;
