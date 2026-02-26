import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { createNewEventt, getEventByIdAsync, getAllEvents, updateEventById, deleteEventById } from "../services/eventService";
import { EventCreateRequest } from "../models/eventCreateRequestModel";

export const healthData = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
};

export const createEvent = async (req: Request, res: Response) => {
    const requestEvent: EventCreateRequest = {
        name: req.body.name,
        date: req.body.date,
        capacity: req.body.capacity,
        registrationCount: req.body.registrationCount,
        status: req.body.status,
        category: req.body.category
    }
    let result = await createNewEventt(requestEvent)
    res.status(HTTP_STATUS.CREATED).send(result)
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id as string;
        let results = await getEventByIdAsync(id)

        res.status(HTTP_STATUS.OK).json(successResponse(results, "Event retrieved"))
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
    }
}

export const getAllEvent = async (req: Request, res: Response) => {
    try {
        const events = await getAllEvents() ?? [];
        res.status(HTTP_STATUS.OK).json({ message: "Events retrieved", count: events.length, data: events });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
    }
}

export const updateEventByIdAsync = async (req: Request, res: Response) => {
    let id: string = req.params.id as string; 
    let request: EventCreateRequest = {
        name: req.body.name,
        date:req.body.date,
        capacity: req.body.capacity,
        registrationCount: req.body.registrationCount,
        status: req.body.status,
        category: req.body.category
    }

    await updateEventById(id, request)

    res.status(HTTP_STATUS.NO_CONTENT).send(`Event ${id} was updated`);
}

export const deleteEventByIdAsync = async (req: Request, res: Response) => {
    let id = req.params.id as string;
    await deleteEventById(id)

    res.status(HTTP_STATUS.NO_CONTENT).send(`Event ${id} was deleted`);
}
