# Make sure bundled Gems are on $LOAD_PATH
require File.expand_path(file.join(File.dirname(__FILE__), "vendor", "gems", "environment"))

Bundler.require_env(:web)

get '/' do
  "Hello, world"
end
