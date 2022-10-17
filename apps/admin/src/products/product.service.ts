import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async all(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async get(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }

    async create(product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async update(id: number, product): Promise<any> {
        this.productRepository.update(id, product);
    }

    async delete(id: number): Promise<any> {
        this.productRepository.delete(id);
    }

}