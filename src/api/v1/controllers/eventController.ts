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
        capacity: req.body.capacity,
        registrationCount: req.body.registrationCount,
        status: req.body.status,
        category: req.body.category
    }
    let result = await createNewEventt(requestEvent)
    res.status(HTTP_STATUS.CREATED).send(result)
}

