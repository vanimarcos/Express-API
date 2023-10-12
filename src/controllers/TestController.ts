import { Request, Response } from 'express';
import TestService from '../services/TestService';

class TestController {
  private testService: TestService;

  constructor(tService: TestService) {
    this.testService = tService;
  }

  getAll(req: Request, res: Response) {
    try {
      const fakeData = this.testService.getAll();
      const response = {
        code: 200,
        message: 'Data fetched successfully',
        data: fakeData,
      };
      return res.json(response);
    } catch (error) {
      const response = {
        code: 200,
        message: 'Failed to get all test data',
        data: {},
      };
      return res.json(response);
    }
  }

  getByID(req: Request, res: Response) {
    try {
      const fakeData = this.testService.getAll();
      const response = {
        code: 200,
        message: 'Data fetched successfully',
        data: fakeData,
      };
      return res.json(response);
    } catch (error) {
      const response = {
        code: 200,
        message: 'Failed to get all test data',
        data: {},
      };
      return res.json(response);
    }
  }

  create(req: Request, res: Response) {
    try {
      const fakeData = this.testService.getAll();
      const response = {
        code: 200,
        message: 'Data fetched successfully',
        data: fakeData,
      };
      return res.json(response);
    } catch (error) {
      const response = {
        code: 200,
        message: 'Failed to get all test data',
        data: {},
      };
      return res.json(response);
    }
  }

  update(req: Request, res: Response) {
    try {
      const fakeData = this.testService.getAll();
      const response = {
        code: 200,
        message: 'Data fetched successfully',
        data: fakeData,
      };
      return res.json(response);
    } catch (error) {
      const response = {
        code: 200,
        message: 'Failed to get all test data',
        data: {},
      };
      return res.json(response);
    }
  }

  delete(req: Request, res: Response) {
    try {
      const fakeData = this.testService.getAll();
      const response = {
        code: 200,
        message: 'Data fetched successfully',
        data: fakeData,
      };
      return res.json(response);
    } catch (error) {
      const response = {
        code: 200,
        message: 'Failed to get all test data',
        data: {},
      };
      return res.json(response);
    }
  }
}

export default TestController;
