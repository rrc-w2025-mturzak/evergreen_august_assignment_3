import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
// import { successResponse } from "../models/responseModel";
// import { createNewProduct, getProductByIdAsync, getAllProducts, updateProductById, deleteProductById } from "../services/eventService";
// import { ProductCreateRequest } from "../models/eventCreateRequestModel";

export const healthData = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
};

// export const createProduct = async (req: Request, res: Response) => {
//     const requestProduct: ProductCreateRequest = {
//         name: req.body.name,
//         sku: req.body.sku,
//         quantity: req.body.quantity,
//         price: req.body.price,
//         category: req.body.category
//     }
//     let result = await createNewProduct(requestProduct)
//     res.status(HTTP_STATUS.CREATED).send(result)
// }

// export const getProductById = async (req: Request, res: Response) => {
//     try {
//         let id = req.params.id as string;
//         let results = await getProductByIdAsync(id)

//         res.status(HTTP_STATUS.OK).json(successResponse(results, "Product retrieved"))
//     } catch (error) {
//         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
//     }
// }

// export const getAllProduct = async (req: Request, res: Response) => {
//     try {
//         const products = await getAllProducts();
//         res.status(HTTP_STATUS.OK).json(successResponse(products, "Products retrieved"))
//     } catch (error) {
//         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
//     }
// }

// export const updateProductByIdAsync = async (req: Request, res: Response) => {
//     let id: string = req.params.id as string; 
//     let request: ProductCreateRequest = {
//         name: req.body.name,
//         sku: req.body.sku,
//         quantity: req.body.quantity,
//         price: req.body.price,
//         category: req.body.category
//     }

//     await updateProductById(id, request)

//     res.status(HTTP_STATUS.NO_CONTENT).send(`Product ${id} was updated`);
// }

// export const deleteProductByIdAsync = async (req: Request, res: Response) => {
//     let id = req.params.id as string;
//     await deleteProductById(id)

//     res.status(HTTP_STATUS.NO_CONTENT).send(`Product ${id} was deleted`);
// }
