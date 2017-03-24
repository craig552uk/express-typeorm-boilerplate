import { getEntityManager, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { NotFound, BadRequest } from "http-errors";

export class ProductController {

    private static _entityManager: Repository<Product>;

    constructor() {
        throw Error("Cannot be intantiated");
    }

    /**
     * Return Repository Manager for Product Entity
     */
    private static db(): Repository<Product> {
        return this._entityManager || (this._entityManager = getEntityManager().getRepository(Product));
    }

    /**
     * Validate submitted fields
     * @param fields 
     */
    private static validate(fields: Partial<Product>): boolean {
        if (!fields.name) throw new BadRequest("Product requires `name`");
        return true;
    }

    /**
     * Get all Products
     */
    public static async getAll(): Promise<Product[]> {
        return await this.db().find();
    }

    /**
     * Add a new Product
     * @param fields 
     */
    public static async add(fields: Partial<Product>): Promise<Product> {
        this.validate(fields);
        let item = new Product();
        item.name = fields.name;
        return await this.db().persist(item);
    }

    /**
     * Get a Product by id
     * @param id 
     */
    public static async getById(id: number): Promise<Product> {
        let item = await this.db().findOneById(id);
        if (!item) throw new NotFound();
        return item;
    }

    /**
     * Update a Products by id
     * @param id 
     * @param fields 
     */
    public static async updateById(id: number, fields: Partial<Product>): Promise<Product> {
        this.validate(fields);
        let item = await this.getById(id);
        item.name = fields.name;
        return await this.db().persist(item);
    }

    /**
     * Delete a Product by id
     * @param id 
     */
    public static async deleteById(id: number): Promise<number> {
        let item = await this.getById(id);
        await this.db().remove(item);
        return id;
    }

    /**
     * Delete all Products
     */
    public static async deleteAll(): Promise<boolean> {
        let items = await this.getAll();
        await this.db().remove(items);
        return true;
    }
}