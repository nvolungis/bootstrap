defmodule Server.Repo.Migrations.AssociatePostAndUser do
  use Ecto.Migration

  def change do
    alter table(:stocks) do
      add :user_id, references(:users), null: false
    end
  end
end
