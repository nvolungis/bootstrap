import { useQuery } from 'urql';

const StocksQuery = `
  query Dashboard2StockQuery {
    stocks {
      id
      name
      ticker
      price
    }
  }
`;

const Dashboard = () => {
  const [{ data }] = useQuery({ query: StocksQuery });

  return (
    <div>
      <h1>Dashboard2</h1>
      <ul>
        {data.stocks.map(stock => (
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
