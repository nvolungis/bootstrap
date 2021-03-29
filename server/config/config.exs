# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :server,
  ecto_repos: [Server.Repo],
  token_ttl: {10, :seconds},
  refresh_ttl: {30, :seconds}

# Configures the endpoint
config :server, ServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "UlzA2+FtX91SLx1rEfOVsl8yDhJcrxrQuJYtEn5yv6GdPVWsGoaBtzsjxPWtIunC",
  pubsub_server: Server.PubSub,
  live_view: [signing_salt: "nIErVdYh"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# configures Guardian
config :server, Server.Guardian,
  issuer: "server",
  allowed_drift: 2000,
  # generated using: JOSE.JWK.generate_key({:oct, 16}) |> JOSE.JWK.to_map |> elem(1)
  secret_key: %{"k" => "oVJF7ECCXnCyj1L7sKlRUA", "kty" => "oct"},
  serializer: Server.Guardian

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
