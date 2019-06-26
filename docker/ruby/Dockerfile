FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /api
WORKDIR /api
COPY ./backend/Gemfile /api/Gemfile
COPY ./backend/Gemfile.lock /api/Gemfile.lock

RUN gem update --system
RUN gem install bundler -v 2.0.1

RUN bundle install
COPY . /api

# Add a script to be executed every time the container starts.
COPY ./backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
