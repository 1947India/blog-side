# config valid for current version and patch releases of Capistrano
lock "~> 3.19.2"

server '35.173.213.38', user: 'ubuntu', roles: %w{app db web}, primary: true

set :application, "blog_side"
set :repo_url, "git@github.com:1947India/blog-side.git"
set :user, 'ubuntu'

set :rvm_type, :user
set :rvm_ruby_version, '3.2.3'  # Replace with your correct Ruby version

# Deploy location on server
set :deploy_to, "/home/#{fetch(:user)}/apps/#{fetch(:application)}"

# Default branch is :master
# You can override it using: cap production deploy BRANCH=branch_name
set :branch, ENV['BRANCH'] || "main"

set :pty, true
set :use_sudo, false
set :rails_env, "production"
set :deploy_via, :remote_cache

set :ssh_options, {
  forward_agent: true,
  user: fetch(:user),
  # keys: %w(~/.ssh/id_rsa)
    keys: %w(~/.ssh/blog_system_app.pem),
}

# Files and folders that should persist across deploys
set :linked_files, %w{config/database.yml config/master.key}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/system storage}

# Puma configs (optional, if you're using Puma)
set :puma_threads, [4, 16]
set :puma_workers, 0
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{shared_path}/log/puma.error.log"
set :puma_error_log, "#{shared_path}/log/puma.access.log"
set :puma_preload_app, true
set :puma_init_active_record, true  # if using ActiveRecord
set :puma_systemctl_user, :user

namespace :deploy do
  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      invoke 'deploy'
    end
  end

  after :finishing, 'deploy:compile_assets'
  after :finishing, 'deploy:cleanup'
  after :finishing, 'deploy:restart'
end
