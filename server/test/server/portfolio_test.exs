defmodule Server.PortfolioTest do
  use Server.DataCase
  alias Server.Portfolio

  test "list stocks" do
    user = user_fixture()
    user2 = user_fixture(%{email: "name2@mail.com"})
    stock = stock_fixture(user)
    stock_fixture(user2)

    assert Portfolio.list_stocks(user) == [stock]
  end

  test "create stock" do
    user = user_fixture()
    {:ok, stock} = Portfolio.create_stock(%{
      name: "name",
      price: 1.0,
      ticker: "TIK",
      user_id: user.id
    })

    assert stock.name == "name"
    assert stock.user_id == user.id
  end
end
