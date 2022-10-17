import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    image: String;

    @Column({
        default: 0
    })
    likes: number;
    
}