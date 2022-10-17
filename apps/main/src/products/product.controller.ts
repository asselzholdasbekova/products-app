import { Controller, Get, Param, Post } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) {}

    @Get()
    async all() {
        return this.productService.all();
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.get(id);

        return this.productService.update(id, {
            likes: product.likes + 1
        })
    }

    @EventPattern('product_created')
    async create(product: any) {
        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        });
        console.log('created');
    }

    @EventPattern('product_updated')
    async update(product) {
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        });
        console.log('updated');
    }

    @EventPattern('product_deleted')
    async delete(id: number) {
        await this.productService.delete(id);
        console.log('deleted');
    }

}