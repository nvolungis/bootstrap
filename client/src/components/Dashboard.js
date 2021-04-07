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

const Stocks = ({stocks}) => {
  if (stocks.length === 0) {
    return <span>Not tracking any stocks yet</span>
  }

  return (
    <ul>
      {stocks.map(stock => (
        <li key={stock.id}>
          <div>name: {stock.name}</div>
          <div>ticker: {stock.ticker}</div>
          <div>price: {stock.price}</div>
        </li>
      ))}
    </ul>
  );
}

const Error = (error) => <span>{error.message}</span>;

const Dashboard = () => {
  const [{data, error}] = useQuery({ query: StocksQuery });

  return (
    <div>
      <h1>Dashboard</h1>
      {error ? <Error error={error} /> : <Stocks stocks={data.stocks} />}
    </div>
  );
};

export default Dashboard;
