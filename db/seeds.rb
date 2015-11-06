# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

5.times do
  user = User.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password_digest: Faker::Internet.password
  )
  1.times do
    user.articles.create(
    location: Faker::Address.city,
    latitude: Faker::Address.latitude,
    longitude: Faker::Address.longitude,
    body: Faker::Lorem.paragraph,
    date_traveled: Faker::Date.backward(700)
    )
  end
end
