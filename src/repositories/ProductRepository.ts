import { Prisma, Product } from "@prisma/client";
import { IProductRepository } from "./IProductRepository";
import { prismaClient } from "../database";
import { ICreateProductDTO } from "../../implementation/dtos/ICreateProductDTO";

class ProductRepository implements IProductRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.product;
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = await this.repository.create({
      data
    });

    return product;
  }

  async show(): Promise<Product[]> {
    const products = await this.repository.findMany();

    return products;
  }

  async showById(id: string): Promise<(Product & {
    _count: Prisma.ProductCountOutputType;
}) | null> {
    const product = await this.repository.findUnique({
      where: {
        id
      },
      include: {
        _count: true
      }
    });

    return product;
  }

  async showByName(name: string): Promise<Product | null> {
    const product = await this.repository.findFirst({
      where: {
        name
      }
    });

    return product;
  }

  async update(id: string, data: ICreateProductDTO): Promise<Product> {
    const product = await this.repository.update({
      where: {
        id
      },
      data
    });

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id
      }
    });
  }

  async showBySellerId(sellerId: string): Promise<Product[]> {
    const products = await this.repository.findMany({
      where: {
        sellerId
      }
    });

    return products;
  }
}

export {ProductRepository}