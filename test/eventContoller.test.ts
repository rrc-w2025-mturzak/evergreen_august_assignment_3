import { Request, Response } from 'express';
import * as controllerModule from 'src/api/v1/controllers/eventController';
import * as serviceModule from 'src/api/v1/services/eventService';

jest.mock('src/api/v1/services/eventService');

describe('EventController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {}, query: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    
  });

  describe('healthData', () => {
    it('returns uptime and metadata', () => {
      controllerModule.healthData(mockReq as Request, mockRes as Response);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 200,
          uptime: expect.any(Number),
          timestamp: expect.any(String),
          version: expect.any(String)
        })
      );
    });
  });

  describe('createEvent', () => {
    it('creates an event and returns created data', async () => {
      // Arrange: prepare request body and stub service responses
      const body = { name: 'Tech Conference 2026', date: '2026-12-25T09:00:00.000Z', capacity: 200 };
      mockReq.body = body;

      const createdId = 'evt_000001';
      const returnedEvent = {
        id: 'evt_000001',
        name: 'Tech Conference 2026',
        date: '2026-12-25T09:00:00.000Z',
        capacity: 200,
        registrationCount: 50,
        status: 'active',
        category: 'conference',
        createdAt: '2026-02-28T01:50:57.242Z',
        updatedAt: '2026-02-28T01:50:57.242Z'
      };

      (serviceModule.createNewEventt as jest.Mock).mockResolvedValue(createdId);
      (serviceModule.getEventByIdAsync as jest.Mock).mockResolvedValue(returnedEvent);

      // Act: call controller
      await controllerModule.createEvent(mockReq as Request, mockRes as Response);

      // Assert: service was called correctly and response formatted
      expect(serviceModule.createNewEventt).toHaveBeenCalledWith(expect.objectContaining({
        name: body.name,
        date: body.date,
        capacity: body.capacity,
        registrationCount: 0,
        status: 'active',
        category: 'general'
      }));

      expect(serviceModule.getEventByIdAsync).toHaveBeenCalledWith(createdId);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Event created', data: returnedEvent });
    });
  });

  describe('getEventById', () => {
    it('returns event when found', async () => {
      // Arrange
      const id = 'evt_000002';
      mockReq.params = { id };
      const event = {
        id: 'evt_000002',
        name: 'ABC',
        date: '2026-12-25T09:00:00.000Z',
        capacity: 100,
        registrationCount: 0,
        status: 'active',
        category: 'general',
        createdAt: '2026-02-28T01:52:07.781Z',
        updatedAt: '2026-02-28T01:52:07.781Z'
      };

      (serviceModule.getEventByIdAsync as jest.Mock).mockResolvedValue(event);

      // Act
      await controllerModule.getEventById(mockReq as Request, mockRes as Response);

      // Assert
      expect(serviceModule.getEventByIdAsync).toHaveBeenCalledWith(id);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'success', data: event, message: 'Event retrieved' })
      );
    });

    it('returns 500 on error', async () => {
      // Arrange: set up failing service
      const id = 'evt1';
      mockReq.params = { id };
      (serviceModule.getEventByIdAsync as jest.Mock).mockRejectedValue(new Error('fail'));

      // Act
      await controllerModule.getEventById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  describe('getAllEvent', () => {
    it('returns list of events', async () => {
      // Arrange
      const events = [
        {
          id: 'evt_000001',
          name: 'Tech Conference 2026',
          date: '2026-12-25T09:00:00.000Z',
          capacity: 200,
          registrationCount: 50,
          status: 'active',
          category: 'conference',
          createdAt: '2026-02-28T01:50:57.242Z',
          updatedAt: '2026-02-28T01:50:57.242Z'
        },
        {
          id: 'evt_000002',
          name: 'ABC',
          date: '2026-12-25T09:00:00.000Z',
          capacity: 100,
          registrationCount: 0,
          status: 'active',
          category: 'general',
          createdAt: '2026-02-28T01:52:07.781Z',
          updatedAt: '2026-02-28T01:52:07.781Z'
        }
      ];
      (serviceModule.getAllEvents as jest.Mock).mockResolvedValue(events);

      // Act
      await controllerModule.getAllEvent(mockReq as Request, mockRes as Response);

      // Assert
      expect(serviceModule.getAllEvents).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Events retrieved', count: events.length, data: events });
    });

    it('returns 500 on error', async () => {
      // Arrange
      (serviceModule.getAllEvents as jest.Mock).mockRejectedValue(new Error('oh no'));

      // Act
      await controllerModule.getAllEvent(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  describe('updateEventByIdAsync', () => {
    it('updates and returns no content', async () => {
      // Arrange
      const id = 'evt_000003';
      mockReq.params = { id };
      mockReq.body = { name: 'Small Event Updated', date: '2026-12-25T09:00:00.000Z', capacity: 5 };

      (serviceModule.updateEventById as jest.Mock).mockResolvedValue(undefined);

      // Act
      await controllerModule.updateEventByIdAsync(mockReq as Request, mockRes as Response);

      // Assert
      expect(serviceModule.updateEventById).toHaveBeenCalledWith(id, expect.objectContaining({
        name: 'Small Event Updated',
        date: '2026-12-25T09:00:00.000Z',
        capacity: 5
      }));
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalledWith(`Event ${id} was updated`);
    });
  });

  describe('deleteEventByIdAsync', () => {
    it('deletes and returns no content', async () => {
      // Arrange
      const id = 'evt_000004';
      mockReq.params = { id };
      (serviceModule.deleteEventById as jest.Mock).mockResolvedValue(undefined);

      // Act
      await controllerModule.deleteEventByIdAsync(mockReq as Request, mockRes as Response);

      // Assert
      expect(serviceModule.deleteEventById).toHaveBeenCalledWith(id);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalledWith(`Event ${id} was deleted`);
    });
  });
});
