defmodule Server.Support.Fixtures do
  alias Server.Portfolio
  alias Server.Account

  def stock_fixture(%Account.User{} = user, attrs \\ %{}) do
    {:ok, stock} = attrs
      |> Enum.into(%{
        user_id: user.id,
        name: "stock",
        price: 1.50,
        ticker: "STK"
      })
      |> Portfolio.create_stock()
    stock
  end

  def user_fixture(attrs \\ %{}) do
    {:ok, user} = attrs
      |> Enum.into(%{
        name: "name",
        email: "namefixture@mail.com",
        password: "pw"
      })
      |> Account.create_user()
    user
  end
end
