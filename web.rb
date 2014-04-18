class MyApp < Sinatra::Base
  get '/' do
    "Hello, %s world" % [ ENV[RACK_ENV] ]
  end
end
