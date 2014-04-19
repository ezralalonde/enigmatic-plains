require "sequel"

unless ENV["RACK_ENV"] == "production"
  require "dotenv"
  Dotenv.load
end

def environment
  ENV["RACK_ENV"].to_sym
end

def database
  Sequel.connect(ENV["DATABASE_URL"])
end

def orders
  database[:orders]
end
