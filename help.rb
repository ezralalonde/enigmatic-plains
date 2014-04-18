require "sequel"

def environment
  ENV["RACK_ENV"].to_sym
end

def database
  Sequel.connect(ENV["DATABASE_URL"])
end
