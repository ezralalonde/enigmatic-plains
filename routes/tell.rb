
class MyApp < Sinatra::Base
  get "/tell" do
    "Tell, %s world" % environment
  end
end

