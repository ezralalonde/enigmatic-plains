
class MyApp < Sinatra::Base
  get "/tell" do
    "Tell, %s world" % ENV["RACK_ENV"]
  end
end

