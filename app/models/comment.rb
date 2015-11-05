class Comment < ActiveRecord::Base
  validates :body, presence: true

  belongs_to :article
  belongs_to :user
end
