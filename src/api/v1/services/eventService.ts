import { addEvent, getEventById, getEvents, updateEvent, deleteEvent } from "../repositories/firestoreRepository";
import { EventResponse } from "../models/eventResponse";
import { EventCreateRequest } from "../models/eventCreateRequestModel";
import { EventDTO } from "../models/eventDTO";

export const createNewEvent =  async (item: EventCreateRequest): Promise<string> => {
    return await addEvent(item); 
}

export const getEventByIdAsync = async (id: string): Promise<EventResponse> => {
    let entity = await getEventById(id);
    return {
        id: entity?.id,
        name: entity?.name,
        date: entity?.date,
        capacity: entity?.capacity,
        registrationCount: entity?.registrationCount,
        status: entity?.status,
        category: entity?.category
    };
}
