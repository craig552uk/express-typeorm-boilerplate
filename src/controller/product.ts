import { getEntityManager, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { NotFound } from "http-errors";

export class ProductController {

    private static _instance: ProductController;
    private static _entityManager: Repository<Product>;

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

    public async add(fields: { name: string }): Promise<Product> {
        // TODO Validation
        let item = new Product();
        item.name = fields.name;
        return await ProductController._entityManager.persist(item);
    }

    public async getById(id: number): Promise<Product> {
        let item = await ProductController._entityManager.findOneById(id);
        if (!item) throw new NotFound();
        return item;
    }

    public async updateById(id: number, fields: { name: string }): Promise<Product> {
        // TODO Validation
        let item = await ProductController._instance.getById(id);
        item.name = fields.name;
        return await ProductController._entityManager.persist(item);
    }

    public async deleteById(id: number): Promise<number> {
        let item = await ProductController._instance.getById(id);
        await ProductController._entityManager.remove(item);
        return id;
    }
}