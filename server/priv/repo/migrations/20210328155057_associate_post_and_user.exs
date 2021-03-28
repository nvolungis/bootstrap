defmodule Server.Repo.Migrations.AssociatePostAndUser do
  use Ecto.Migration

  def change do
    alter table(:portfolio_stocks) do
      add :account_user_id, references(:account_users), null: false
    end
  end
end
