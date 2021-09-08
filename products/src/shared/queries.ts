export const SELECT_PRODUCTS_WITH_STOCKS = 'SELECT id, title, description, price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id'
export const SELECT_PRODUCTS_WITH_STOCKS_BY_ID = (id: string) => `${SELECT_PRODUCTS_WITH_STOCKS} WHERE p.id = '${id}'`