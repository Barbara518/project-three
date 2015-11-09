json.article_id @comment.article_id
json.user_id @comment.user_id

json.comment do
  json.id com.id
  json.body com.body
end
