source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "propshaft"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "jsbundling-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "cssbundling-rails"
gem "jbuilder"
gem 'devise'

gem "tzinfo-data", platforms: %i[ windows jruby ]
gem 'pg_search'
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem 'rack-cors'

gem "bootsnap", require: false

gem "kamal", require: false
# Gemfile
gem 'jwt'

gem "thruster", require: false


group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
