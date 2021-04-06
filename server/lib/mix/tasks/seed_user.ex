defmodule Mix.Tasks.SeedUser do
  use Mix.Task
  alias Server.Support.Fixtures
  alias Server.Account
  require Logger

  def run(_) do
    Logger.info "creating users"
    Application.ensure_all_started(:server)

    Account.delete_all_users()
    Fixtures.user_fixture() |> Logger.info
    Logger.info "user created"
  end
end
