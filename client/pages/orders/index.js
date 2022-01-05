import Link from 'next/link';

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          <Link href={`/orders/${order.id}`}>
            <a>{order.status}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
