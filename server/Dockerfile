FROM elixir:latest

RUN apt-get update && apt-get install -y postgresql-client zsh git

RUN echo "y" | sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

WORKDIR /root/
