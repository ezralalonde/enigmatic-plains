require "rubygems"
require "bundler"

require "./help"
Bundler.require(:default, :web, environment)

require "./web"
MyApp.run!

