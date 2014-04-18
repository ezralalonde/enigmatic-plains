class MyApp < Sinatra::Base
  get "/show" do
    "Show, %s world" % ENV["RACK_ENV"]
  end
end

