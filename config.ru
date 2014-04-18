require "rubygems"
require "bundler"

Bundler.require(:default, :web, ENV['RACK_ENV'].to_sym)

require "./web"
MyApp.run!
