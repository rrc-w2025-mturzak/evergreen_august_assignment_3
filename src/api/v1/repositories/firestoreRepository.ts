import { db } from "../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { EventModel } from "../models/eventModel";
import { EventCreateRequest } from "../models/eventCreateRequestModel";
import { EventDTO } from "../models/eventDTO";

export const addEvent = async (item:EventCreateRequest): Promise<string> => {

    const docRef: DocumentReference = db.collection("events").doc();

    const itemEntity: EventModel = {
        name: item.name,
        date: new Date,
        capacity: item.capacity,
        registrationCount: item.registrationCount,
        status: item.status,
        category: item.category,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    await docRef.set(itemEntity);
    return docRef.id;
};

