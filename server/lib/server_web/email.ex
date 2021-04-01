defmodule ServerWeb.Email do
  import Bamboo.Email

  def password_reset_token_email(email, token) do
    new_email(
      to: email,
      from: "support@server.com",
      subject: "Password reset token",
      html_body: "<stron>#{token}</strong>",
      text_body: token
    )
  end
end
