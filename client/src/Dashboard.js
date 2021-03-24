import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

const StocksQuery = graphql`
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
  const data = useLazyLoadQuery(StocksQuery);
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
