
class MyApp < Sinatra::Base
  get "/" do
    redirect "local.html"
  end

  get "/tell" do
    "Tell, %s world" % environment
  end
end

