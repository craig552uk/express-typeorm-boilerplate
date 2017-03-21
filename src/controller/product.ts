import { getEntityManager } from "typeorm";
import { Product } from "../entity/Product";

export class ProductController {

    private static _instance: ProductController;
    private static _entityManager;

    constructor() {
        if (ProductController._instance) throw Error("Cannot be reinstantiated");
        ProductController._entityManager = getEntityManager().getRepository(Product);
    }

    public static getInstance(): ProductController {
        return this._instance || (this._instance = new ProductController());
    }

    public async getAll(): Promise<Product[]> {
        return await ProductController._entityManager.find();
    }

    public async getById(id: number): Promise<Product> {
        return await ProductController._entityManager.findOneById(id);
    }
}