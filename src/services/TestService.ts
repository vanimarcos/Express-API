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
}

export default TestService;
