import {
  createNewEventt,
  getEventByIdAsync,
  getAllEvents,
  updateEventById,
  deleteEventById,
} from 'src/api/v1/services/eventService';
import * as repositoryModule from 'src/api/v1/repositories/firestoreRepository';

// sample dataset mimicked in controller tests
const sampleData = [
  {
    id: 'evt_000001',
    name: 'Tech Conference 2026',
    date: '2026-12-25T09:00:00.000Z',
    capacity: 200,
    registrationCount: 50,
    status: 'active',
    category: 'conference',
    createdAt: '2026-02-28T01:50:57.242Z',
    updatedAt: '2026-02-28T01:50:57.242Z',
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
    updatedAt: '2026-02-28T01:52:07.781Z',
  },
  {
    id: 'evt_000003',
    name: 'Small Event',
    date: '2026-12-25T09:00:00.000Z',
    capacity: 5,
    registrationCount: 0,
    status: 'active',
    category: 'general',
    createdAt: '2026-02-28T01:53:01.315Z',
    updatedAt: '2026-02-28T01:53:01.315Z',
  },
  {
    id: 'evt_000004',
    name: 'Sold Out Event',
    date: '2026-12-25T09:00:00.000Z',
    capacity: 100,
    registrationCount: 100,
    status: 'active',
    category: 'general',
    createdAt: '2026-02-28T01:53:52.512Z',
    updatedAt: '2026-02-28T01:53:52.512Z',
  },
];

// Mock the repository functions
jest.mock('src/api/v1/repositories/firestoreRepository');

describe('eventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createNewEventt', () => {
    it('calls repository.addEvent and returns id', async () => {
      // Arrange
      const input = {
        name: sampleData[0].name,
        date: sampleData[0].date,
        capacity: sampleData[0].capacity,
        registrationCount: sampleData[0].registrationCount,
        status: sampleData[0].status,
        category: sampleData[0].category,
      };
      (repositoryModule.addEvent as jest.Mock).mockResolvedValue(sampleData[0].id);

      // Act
      const result = await createNewEventt(input as any);

      // Assert
      expect(repositoryModule.addEvent).toHaveBeenCalledWith(input);
      expect(result).toBe(sampleData[0].id);
    });

    it('propagates repository errors', async () => {
      // Arrange
      const input = { name: 'x' };
      const err = new Error('fail');
      (repositoryModule.addEvent as jest.Mock).mockRejectedValue(err);

      // Assert
      await expect(createNewEventt(input as any)).rejects.toThrow(err);
    });
  });

  describe('getEventByIdAsync', () => {
    it('returns formatted event', async () => {
      // Arrange
      const dto = sampleData[1];
      (repositoryModule.getEventById as jest.Mock).mockResolvedValue(dto);

      // Act
      const result = await getEventByIdAsync(dto.id);

      // Assert
      expect(repositoryModule.getEventById).toHaveBeenCalledWith(dto.id);
      expect(result).toEqual(dto);
    });

    it('propagates errors from repository', async () => {
      // Arrange
      const id = 'nonexistent';
      const err = new Error('db fail');
      (repositoryModule.getEventById as jest.Mock).mockRejectedValue(err);

      // Assert
      await expect(getEventByIdAsync(id)).rejects.toThrow(err);
    });
  });

  describe('getAllEvents', () => {
    it('delegates to repository and returns array', async () => {
      // Arrange
      (repositoryModule.getEvents as jest.Mock).mockResolvedValue(sampleData);

      // Act
      const result = await getAllEvents();

      // Assert
      expect(repositoryModule.getEvents).toHaveBeenCalled();
      expect(result).toEqual(sampleData);
    });

    it('propagates errors', async () => {
      // Arrange
      const err = new Error('db gone');
      (repositoryModule.getEvents as jest.Mock).mockRejectedValue(err);

      // Assert
      await expect(getAllEvents()).rejects.toThrow(err);
    });
  });

  describe('updateEventById', () => {
    it('invokes repository.updateEvent', async () => {
      // Arrange
      const id = sampleData[2].id;
      const input = { name: 'modified' };
      (repositoryModule.updateEvent as jest.Mock).mockResolvedValue(undefined);

      // Act
      await updateEventById(id, input as any);

      // Assert
      expect(repositoryModule.updateEvent).toHaveBeenCalledWith(id, input);
    });

    it('propagates repository errors', async () => {
      // Arrange
      const id = sampleData[2].id;
      const err = new Error('update fail');
      (repositoryModule.updateEvent as jest.Mock).mockRejectedValue(err);

      // Assert
      await expect(updateEventById(id, {} as any)).rejects.toThrow(err);
    });
  });

  describe('deleteEventById', () => {
    it('invokes repository.deleteEvent', async () => {
      // Arrange
      const id = sampleData[3].id;
      (repositoryModule.deleteEvent as jest.Mock).mockResolvedValue(undefined);

      // Act
      await deleteEventById(id);

      // Assert
      expect(repositoryModule.deleteEvent).toHaveBeenCalledWith(id);
    });

    it('propagates errors', async () => {
      // Arrange
      const id = sampleData[3].id;
      const err = new Error('delete fail');
      (repositoryModule.deleteEvent as jest.Mock).mockRejectedValue(err);

      // Assert
      await expect(deleteEventById(id)).rejects.toThrow(err);
    });
  });
});