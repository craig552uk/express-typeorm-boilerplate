import { getEntityManager } from "typeorm";
import { Product } from "../entity/Product";

function getRepository(){
    return getEntityManager().getRepository(Product);
}

export async function getAll(): Promise<{}[]> {
    const repository = getRepository();
    return await repository.find();
}

export async function getById(id: Number): Promise<{}[]> {
    const repository = getRepository();
    return await repository.find(id);
}