import { useQuery } from 'urql';

const StocksQuery = `
  query DashboardStockQuery {
    stocks {
      id
      name
      ticker
      price
    }
  }
`;

const Dashboard = () => {
  const [{ data, fetching, error }] = useQuery({ query: StocksQuery });

  if (fetching) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data && data.stocks.map(stock => (
          <li key={stock.id}>
            <div>name: {stock.name}</div>
            <div>ticker: {stock.ticker}</div>
            <div>price: {stock.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
