import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteAlert from './DeleteAlert';
import { formatDate } from '@/lib/utils';

interface TableBodyProps {
  products: Products[] | null;
}

function TableBody({ products }: TableBodyProps) {
  if (!products || products.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No products found.</div>
    );
  }

  return (
    <tbody className="bg-card divide-border divide-y">
      {products.map((product) => (
        <tr key={product.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            {product.imageUrls && product.imageUrls.length > 0 ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.productName}
                width={40}
                height={40}
                className="rounded object-cover"
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded text-xs">
                No Image
              </div>
            )}
          </td>
          <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
            {product.productName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </td>
          <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
            ${product.price.toFixed(2)}
          </td>
          <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
            {formatDate(product.createdAt)}
          </td>
          <td className="flex items-center px-6 py-6 text-sm font-medium whitespace-nowrap">
            <Link
              href={`/products/${product.id}`}
              className="text-primary hover:text-primary/80 mr-2 cursor-pointer"
              title="Edit"
            >
              <SquarePen className="text-black dark:text-white" />
            </Link>
            <DeleteAlert product={product} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
