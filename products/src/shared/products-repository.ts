import { BaseRepository } from "@core/repository";
import { ProductDto } from "@models/product-dto";

export class ProductsRepository extends BaseRepository<ProductDto> {
  public async create({ title, description, price }: Omit<ProductDto, 'id' | 'count'>): Promise<ProductDto> {
    const result = await this.client.query(`INSERT INTO products (title, description, price) VALUES ('${title}', '${description}', ${price}) RETURNING *`)
    return result.rows[0];
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
