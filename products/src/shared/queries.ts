export class Queries {
  static selectAll = 'SELECT id, title, description, price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id'

  static selectById(id: string) {
    return `${this.selectAll} WHERE p.id = '${id}'`
  }

  static create({ title, description, price }: CreateProductBody) {
    return `INSERT INTO products (title, description, price) VALUES ('${title}', '${description}', ${price}) RETURNING *`
  }
}

interface CreateProductBody {
  title: string
  description: string
  price: number
}