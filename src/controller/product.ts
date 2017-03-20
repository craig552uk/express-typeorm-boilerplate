import { getEntityManager } from "typeorm";
import { Product } from "../entity/Product";

function getRepository(){
    return getEntityManager().getRepository(Product);
}

export async function getAll(): Promise<{}[]> {
    return await getRepository().find();
}

export async function getById(id: Number): Promise<{}[]> {
    return await getRepository().find(id);
}