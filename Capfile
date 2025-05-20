# # Load DSL and set up stages
# require "capistrano/setup"

# # Include default deployment tasks
# require "capistrano/deploy"

# # Load the SCM plugin appropriate to your project:
# #
# # require "capistrano/scm/hg"
# # install_plugin Capistrano::SCM::Hg
# # or
# # require "capistrano/scm/svn"
# # install_plugin Capistrano::SCM::Svn
# # or
# require "capistrano/scm/git"
# install_plugin Capistrano::SCM::Git

# # Include tasks from other gems included in your Gemfile
# #
# # For documentation on these, see for example:
# #
# #   https://github.com/capistrano/rvm
# #   https://github.com/capistrano/rbenv
# #   https://github.com/capistrano/chruby
# #   https://github.com/capistrano/bundler
# #   https://github.com/capistrano/rails
# #   https://github.com/capistrano/passenger
# #
# # require "capistrano/rvm"
# # require "capistrano/rbenv"
# # require "capistrano/chruby"
# # require "capistrano/bundler"
# # require "capistrano/rails/assets"
# # require "capistrano/rails/migrations"
# # require "capistrano/passenger"

# # Load custom tasks from `lib/capistrano/tasks` if you have any defined
# Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }


# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Use Git as SCM
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

# Include Capistrano extensions
require 'capistrano/rails'
require 'capistrano/bundler'
require 'capistrano/rvm'       # or use rbenv if applicable
require 'capistrano/passenger' # or capistrano3/puma if using Puma
# require 'whenever/capistrano'  # for scheduled jobs

# Load custom tasks from `lib/capistrano/tasks` if defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
