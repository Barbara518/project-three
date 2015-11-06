json.user current_user.name
json.users all_users

json.articles(@articles) do |art|

  json.id art.id
  json.user_id art.user_id
  json.location art.location
  json.latitude art.latitude
  json.longitude art.longitude
  json.body art.body
  json.date art.date_traveled

  json.comments(art.comments) do |com|
    json.id com.id
    json.user_id com.user_id
    json.article_id com.article_id
    json.body com.body
  end

end
