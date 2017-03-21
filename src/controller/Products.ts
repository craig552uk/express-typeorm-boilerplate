import { getEntityManager, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { NotFound } from "http-errors";

export class Products {

    private static _entityManager: Repository<Product>;

    constructor() {
        throw Error("Cannot be intantiated");
    }

    public static getEntityManager(): Repository<Product> {
        return this._entityManager || (this._entityManager = getEntityManager().getRepository(Product));
    }

    public static async getAll(): Promise<Product[]> {
        return await this.getEntityManager().find();
    }

    public static async add(fields: { name: string }): Promise<Product> {
        // TODO Validation
        let item = new Product();
        item.name = fields.name;
        return await this.getEntityManager().persist(item);
    }

    public static async getById(id: number): Promise<Product> {
        let item = await this.getEntityManager().findOneById(id);
        if (!item) throw new NotFound();
        return item;
    }

    public static async updateById(id: number, fields: { name: string }): Promise<Product> {
        // TODO Validation
        let item = await this.getById(id);
        item.name = fields.name;
        return await this.getEntityManager().persist(item);
    }

    public static async deleteById(id: number): Promise<number> {
        let item = await this.getById(id);
        await this.getEntityManager().remove(item);
        return id;
    }
}