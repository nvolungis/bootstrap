defmodule Server.Portfolio do
  import Ecto.Query, warn: false

  alias Server.Repo
  alias Server.Portfolio.Stock
  alias Server.Account.User

  def list_stocks(%User{} = user) do
    query =
      from s in Stock,
      where: s.user_id == ^user.id,
      order_by: [desc: :inserted_at]

    Repo.all(query)
  end

  def create_stock(attrs) do
    %Stock{}
      |> Stock.changeset(attrs)
      |> Repo.insert()
  end
end
