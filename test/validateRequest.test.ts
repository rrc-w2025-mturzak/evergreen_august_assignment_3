import { Request, Response, NextFunction } from 'express';
import { validateRequest } from 'src/api/v1/middleware/validateRequest';
import { eventSchemas } from 'src/api/v1/validation/eventValidation';

describe('validateRequest middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe('body validation', () => {
    const middleware = validateRequest({ body: eventSchemas.create.body });

    it('passes when body matches schema and strips extras', () => {
      // Arrange
      mockReq.body = {
        name: 'New Event',
        date: new Date(Date.now() + 10000).toISOString(),
        capacity: 10,
        extra: 'remove me',
      };

      // Act
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      // extra property should be removed by stripUnknown
      expect((mockReq as Request).body).toEqual({
        name: 'New Event',
        date: mockReq.body.date,
        capacity: 10,
      });
    });

    it('responds 400 when body invalid', () => {
      // Arrange: missing required fields
      mockReq.body = { name: 'Short', capacity: 1 };

      // Act
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining('Validation error') })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('params validation', () => {
    const middleware = validateRequest({ params: eventSchemas.getById.params });

    it('passes when params valid', () => {
      // Arrange
      mockReq.params = { id: 'evt_000001' };

      // Act
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
    });

    it('fails when id is missing', () => {
      // Arrange - no id
      mockReq.params = {};

      // Act
      middleware(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining('Validation error') })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('query validation', () => {
    const middleware = validateRequest({ query: eventSchemas.getById.query });

    it('allows valid query parameters', () => {
      mockReq.query = { include: 'comments' };
      middleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect((mockReq as Request).query).toEqual({ include: 'comments' });
    });

    it('rejects invalid query values', () => {
      mockReq.query = { include: 'bad' };
      middleware(mockReq as Request, mockRes as Response, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});