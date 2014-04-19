require "rubygems"
require "bundler"

require "./lib/help"
Bundler.require(:default, :web, environment)

require "./web"
MyApp.run!

