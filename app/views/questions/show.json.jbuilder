# json.(@question, :id, :title, :content)

# json.comments @question.comments do |json, comment|
#   json.content comment.content
# end

# json.array!(@question) do |json, branch|
# json.(@question, :id, :title, :content, :user_id)
# json.answers @question.answers do |json, answer|
#  json.id answer.id
#  json.content answer.content
#  json.comments answer.comments do |json, comment|
#    json.content comment.content
#  end
# end
 # end