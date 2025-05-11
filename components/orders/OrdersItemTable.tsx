import Image from 'next/image';

interface OrderItemsProp {
  orderItems: OrderItems[] | null;
}

function OrdersItemTable({ orderItems }: OrderItemsProp) {
  return (
    <table className="divide-border min-w-full divide-y">
      <tbody className="bg-card divide-border divide-y">
        {orderItems &&
          orderItems.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </td>
              <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                {item.productName}
              </td>
              <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                quantity: {item.quantity}
              </td>
              <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                unit price: ${item.price}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default OrdersItemTable;
