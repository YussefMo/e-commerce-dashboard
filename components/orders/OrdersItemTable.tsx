import Image from 'next/image';

interface OrderItemsProp {
  orderItems: OrderItems[] | null;
}

function OrdersItemTable({ orderItems }: OrderItemsProp) {
  return (
    <div className="border-border max-h-96 overflow-y-auto rounded-md border">
      <table className="divide-border min-w-full divide-y">
        <thead className="bg-muted/50">
          <tr>
            <th
              scope="col"
              className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              Product
            </th>
            <th
              scope="col"
              className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
            >
              Unit Price
            </th>
          </tr>
        </thead>
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
    </div>
  );
}

export default OrdersItemTable;
