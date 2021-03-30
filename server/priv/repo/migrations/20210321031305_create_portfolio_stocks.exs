defmodule Server.Repo.Migrations.CreatePortfolioStocks do
  use Ecto.Migration

  def change do
    create table(:stocks) do
      add :name, :string
      add :ticker, :string
      add :price, :float

      timestamps()
    end

  end
end
