json.articles do
  json.id @articles.id
  json.user_id @articles.user_id
  json.location @articles.location
  json.latitude @articles.latitude
  json.longitude @articles.longitude
  json.body @articles.body
  json.date_traveled @articles.date_traveled
  json.comments []
end
