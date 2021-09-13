import { BaseRepository } from "@core/repository";
import { TransactionCommand } from "@core/models";
import { ProductDto } from "@models/product-dto";

export class ProductsRepository extends BaseRepository<ProductDto> {
  public async create({ title, description, price }: Omit<ProductDto, 'id' | 'count'>): Promise<ProductDto> {
    try {
      await this.client.query(TransactionCommand.Begin)

      const products = await this.client.query(`INSERT INTO products (title, description, price) VALUES ('${title}', '${description}', ${price}) RETURNING id`)
      const { id } = products.rows[0]

      await this.client.query(`INSERT INTO stocks (product_id, count) VALUES ('${id}', 1)`)

      const result = await this.findOne(id)

      await this.client.query(TransactionCommand.Commit)

      return result;
    } catch (error) {
      await this.client.query(TransactionCommand.Rollback)
      throw error
    }
  }

  public async delete(_id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(): Promise<ProductDto[]> {
    const result = await this.client.query(SELECT_ALL_QUERY)
    return result.rows;
  }

  public async findOne(id: string): Promise<ProductDto> {
    const result = await this.client.query(`${SELECT_ALL_QUERY}  WHERE p.id = '${id}'`)
    return result.rows[0];
  }

  public async update(_id: string, _item: ProductDto): Promise<ProductDto> {
    return Promise.resolve(undefined);
  }
}

const SELECT_ALL_QUERY = 'SELECT id, title, description, price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id'
