import Link from 'next/link';

const index = ({ currentUser, tickets }) => {
  console.log(currentUser);
  console.log('Starting...');
  return (
    <div>
      <h1>Tickets</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.price}</td>
              <td>
                <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
                  <a>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

index.getInitialProps = async (context, client, currentUser) => {
  console.log('LANDING PAGE!');
  const { data } = await client.get('/api/tickets');
  return { tickets: data };
};

export default index;
