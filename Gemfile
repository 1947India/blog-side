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
gem "tailwindcss-rails"

gem "bootsnap", require: false

gem "kamal", require: false
# Gemfile
gem 'jwt'

gem "thruster", require: false

gem 'whenever', require: false

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"

  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false

end

group :development do
  gem "web-console"
  gem 'capistrano', require: false
 gem 'capistrano-rvm', require: false
 gem 'capistrano-rails', require: false
 gem 'capistrano-bundler', require: false
 gem 'capistrano3-puma', require: false

 gem 'capistrano-passenger', require: false
  gem 'net-ssh'

  gem 'bcrypt_pbkdf'
  gem 'ed25519'
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
