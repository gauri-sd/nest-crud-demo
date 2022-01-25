import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return new this.productModel(createProductDto).save();
  }

  async findAll() {
    return this.productModel.find();  
  }

  async findOne(_id: string) {
    return this.productModel.findOne({ _id });
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({ _id }, { $set: updateProductDto });
  }
  
  remove(_id: string) {
    return this.productModel.deleteOne({ _id });
  }
}
