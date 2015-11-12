# this is not in use. code left for future improvements.

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
