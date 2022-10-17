import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from "./product.model";
import { Model } from 'mongoose'; 

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async all(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async get(id: number): Promise<Product> {
        return this.productModel.findOne({ id });
    }

    async create(product): Promise<Product> {
        return new this.productModel(product).save();
    }

    async update(id: number, product): Promise<any> {
        return await this.productModel.findOneAndUpdate({ id }, product);
    }

    async delete(id: number): Promise<void> {
        await this.productModel.deleteOne({ id });
    }
}