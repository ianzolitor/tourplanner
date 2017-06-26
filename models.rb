class User <ActiveRecord::Base
  has_many :tours, dependent: :destroy

  validates :username, uniqueness: true
  validates :password, presence: true
end

class Tour <ActiveRecord::Base
  belongs_to :user
  has_many :stops


  validates :name, uniqueness: true
end

class Stop <ActiveRecord::Base
  belongs_to :tour
  has_one :venue
  has_one :lodging


end

class Venue <ActiveRecord::Base
  belongs_to :stop

end

class Lodging <ActiveRecord::Base
  belongs_to :stop

end
