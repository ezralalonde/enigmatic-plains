class MyApp < Sinatra::Base
  get "/show" do
    "Show, %s world" % environment
  end
end

