Sequel.migration do

  up do
    create_table(:orders) do
      primary_key :id
      String :name
      String :plate
      Date   :day
      String :note
    end
  end

  down do
    drop_table(:orders)
  end
end
