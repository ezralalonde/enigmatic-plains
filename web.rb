set :public_folder, File.dirname(__FILE__) + "/static"


require_relative "routes/init"

MyApp.run!
