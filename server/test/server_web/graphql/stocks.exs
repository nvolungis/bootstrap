defmodule ServerWeb.Graphql.StocksTest do
  use ServerWeb.ConnCase, async: true

  @query """
    query getStock {
      stocks {
        name
        price
        ticker
      }
    }
  """

  test "stock" do
    user = user_fixture()
    stock = stock_fixture(user)

    result = @query
      |> run(%{current_user: user})
      |> dig(:stocks)

    assert result == [Map.take(stock, [:name, :price, :ticker])]
  end

  test "stock requires auth" do
    user = user_fixture()
    stock_fixture(user)

    result = run(@query)

    assert hd(result[:errors]).message == "Not logged in"
  end
end
