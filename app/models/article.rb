class Article < ActiveRecord::Base
  validates :location, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true
  validates :body, presence: true
  validates :date_traveled, presence: true

  belongs_to :user, foreign_key: :user_id
  has_many :comments, dependent: :destroy
end
