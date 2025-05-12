class Blog < ApplicationRecord
 include PgSearch::Model
  belongs_to :user
  validates :title, presence: true, uniqueness: { message: "This title has already been taken" }
  # validates :content, presence: true, length: { minimum: 500 }

  pg_search_scope :search_by_title_content_and_tags,
                  against: [:title, :content, :tags],
                  using: { tsearch: { prefix: true } }

  def self.search(query)
    search_by_title_content_and_tags(query)
  end
end
