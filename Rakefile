require "sequel"
require_relative "./help"

unless ENV["DATABASE_URL"]
  require "dotenv"
  Dotenv.load
end

namespace :db do

  desc "Update the DB"
  task :update do
    require "sequel/extensions/migration"
    Sequel::Migrator.apply(database, migration_dir)
  end

  desc "Rollback the DB"
  task :rollback do
    require "sequel/extensions/migration"
    Sequel::Migrator.apply(database, migration_dir, last_version)
  end

  desc "Nuke the DB"
  task :nuke do
    database.tables.each do |table|
      database.drop_table(table)
    end
  end

  desc "Clean DB data"
  task :clean => [:nuke, :update]

  def migration_dir
    File.dirname(__FILE__) + "/migrations"
  end

  def last_version
    database[:schema_info].first[:version] - 1
  end

end


