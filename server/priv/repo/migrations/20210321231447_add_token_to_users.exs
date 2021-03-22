defmodule Server.Repo.Migrations.AddTokenToUsers do
  use Ecto.Migration

  def change do
    alter table(:account_users) do
      add :token, :text
    end
  end
end
