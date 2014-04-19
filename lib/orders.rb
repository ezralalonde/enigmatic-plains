require "sequel"
require_relative "./help"

class Order

  def self.save(name, item, note="", day=Date.today)
    orders.insert(:name => name, :item => item, :note => note, :day => day)
  end

  def self.delete(*args)
    orders.where(*args).delete
  end

  def self.load(day=Date.today)
    orders[:day => day]
  end

end
