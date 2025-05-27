import { getAllProducts } from '@/lib/action/product.action';
import TableBody from '../products/TableBody';

async function Latest3Products() {
  const products = await getAllProducts();

  const latestProducts = products ? products.slice(0, 3) : [];

  return (
    <>
      <h2 className="text-card-foreground mb-4 text-xl font-semibold">
        Latest Products
      </h2>
      <table className="bg-card w-full rounded-lg p-4 shadow-md">
        {latestProducts.length > 0 ? (
          <TableBody products={latestProducts} />
        ) : (
          <p className="text-muted-foreground">No products found.</p>
        )}
      </table>
    </>
  );
}

export default Latest3Products;
