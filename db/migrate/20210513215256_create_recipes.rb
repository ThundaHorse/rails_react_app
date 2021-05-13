class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instruction, null: false
      t.string :image, default: "https://i.pinimg.com/originals/5e/fa/77/5efa77186bd7ca39e06aae2bad562351.png"

      t.timestamps
    end
  end
end
