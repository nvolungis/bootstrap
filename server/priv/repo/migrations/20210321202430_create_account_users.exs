defmodule Server.Repo.Migrations.CreateAccountUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :password_hash, :string

      timestamps()
    end

  end
end
