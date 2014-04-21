class MyApp < Sinatra::Base
    enable :sessions
end

require_relative "routes/init"

MyApp.run!
