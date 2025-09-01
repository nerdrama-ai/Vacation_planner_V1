export const mockTravelData = {
  "Paris, France": {
    backpacker: {
      totalBudget: "$800-1200",
      duration: "5 days",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Montmartre Exploration",
          activities: [
            { time: "10:00", task: "Check into hostel in Montmartre", type: "accommodation", completed: false },
            { time: "12:00", task: "Lunch at local bistro", type: "dining", completed: false },
            { time: "14:00", task: "Visit Sacré-Cœur Basilica (Free)", type: "sightseeing", completed: false },
            { time: "16:00", task: "Explore Montmartre streets & street art", type: "activity", completed: false },
            { time: "18:00", task: "Sunset viewing from Montmartre steps", type: "activity", completed: false },
            { time: "20:00", task: "Dinner at affordable local restaurant", type: "dining", completed: false }
          ]
        },
        {
          day: 2,
          title: "Historic Paris & Seine Walk",
          activities: [
            { time: "09:00", task: "Walk to Notre-Dame area", type: "transport", completed: false },
            { time: "10:00", task: "Explore Notre-Dame exterior & Sainte-Chapelle", type: "sightseeing", completed: false },
            { time: "12:00", task: "Picnic lunch along Seine River", type: "dining", completed: false },
            { time: "14:00", task: "Walk through Latin Quarter", type: "activity", completed: false },
            { time: "16:00", task: "Visit Panthéon", type: "sightseeing", completed: false },
            { time: "18:00", task: "Evening stroll along Seine", type: "activity", completed: false }
          ]
        },
        {
          day: 3,
          title: "Louvre & Tuileries",
          activities: [
            { time: "09:00", task: "Early entry to Louvre Museum", type: "sightseeing", completed: false },
            { time: "12:00", task: "Lunch in Tuileries Garden", type: "dining", completed: false },
            { time: "14:00", task: "Explore Tuileries Garden", type: "activity", completed: false },
            { time: "16:00", task: "Walk to Place de la Concorde", type: "activity", completed: false },
            { time: "17:00", task: "Visit local market", type: "activity", completed: false },
            { time: "19:00", task: "Dinner at budget-friendly bistro", type: "dining", completed: false }
          ]
        }
      ],
      accommodation: "Hostel in Montmartre - $25-35/night",
      transport: "Metro day passes - $8/day, Walking tours",
      highlights: ["Free walking tours", "Street art exploration", "Local market visits", "Budget-friendly bistros"]
    },
    travelEnthusiast: {
      totalBudget: "$1800-2500",
      duration: "7 days",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Champs-Élysées",
          activities: [
            { time: "11:00", task: "Check into boutique hotel near Louvre", type: "accommodation", completed: false },
            { time: "13:00", task: "Lunch at Café de Flore", type: "dining", completed: false },
            { time: "15:00", task: "Walk down Champs-Élysées", type: "activity", completed: false },
            { time: "16:30", task: "Arc de Triomphe visit & climb", type: "sightseeing", completed: false },
            { time: "18:00", task: "Evening Seine river cruise", type: "activity", completed: false },
            { time: "20:00", task: "Dinner at traditional French restaurant", type: "dining", completed: false }
          ]
        },
        {
          day: 2,
          title: "Louvre & Île de la Cité",
          activities: [
            { time: "09:00", task: "Priority access Louvre Museum tour", type: "sightseeing", completed: false },
            { time: "12:30", task: "Lunch at museum café", type: "dining", completed: false },
            { time: "14:00", task: "Visit Sainte-Chapelle", type: "sightseeing", completed: false },
            { time: "15:30", task: "Explore Île Saint-Louis", type: "activity", completed: false },
            { time: "17:00", task: "Coffee at famous Berthillon ice cream shop", type: "dining", completed: false },
            { time: "19:00", task: "Seine sunset walk", type: "activity", completed: false }
          ]
        },
        {
          day: 3,
          title: "Versailles Day Trip",
          activities: [
            { time: "08:00", task: "Train to Versailles", type: "transport", completed: false },
            { time: "09:30", task: "Palace of Versailles guided tour", type: "sightseeing", completed: false },
            { time: "12:00", task: "Lunch in Versailles town", type: "dining", completed: false },
            { time: "14:00", task: "Explore Versailles Gardens", type: "activity", completed: false },
            { time: "16:00", task: "Marie Antoinette's Estate visit", type: "sightseeing", completed: false },
            { time: "18:00", task: "Return to Paris", type: "transport", completed: false }
          ]
        }
      ],
      accommodation: "3-star boutique hotel - $120-180/night",
      transport: "Metro passes, some taxis, train to Versailles",
      highlights: ["Priority museum access", "Seine river cruise", "Versailles day trip", "Guided tours"]
    },
    luxury: {
      totalBudget: "$4000-6000",
      duration: "7 days",
      itinerary: [
        {
          day: 1,
          title: "Luxury Arrival & Private Tour",
          activities: [
            { time: "10:00", task: "Check into 5-star hotel with Eiffel Tower view", type: "accommodation", completed: false },
            { time: "12:00", task: "Welcome champagne at hotel bar", type: "dining", completed: false },
            { time: "14:00", task: "Private chauffeur city orientation tour", type: "transport", completed: false },
            { time: "16:00", task: "VIP Eiffel Tower experience with skip-the-line", type: "sightseeing", completed: false },
            { time: "18:00", task: "Private champagne tasting", type: "activity", completed: false },
            { time: "20:00", task: "Michelin-starred restaurant dinner", type: "dining", completed: false }
          ]
        },
        {
          day: 2,
          title: "Private Louvre & Seine Luxury",
          activities: [
            { time: "09:00", task: "Private Louvre curator-led tour", type: "sightseeing", completed: false },
            { time: "12:00", task: "Lunch at Le Meurice restaurant", type: "dining", completed: false },
            { time: "14:30", task: "Private Seine yacht cruise", type: "activity", completed: false },
            { time: "16:30", task: "Exclusive shopping on Rue Saint-Honoré", type: "activity", completed: false },
            { time: "18:00", task: "Spa treatment at hotel", type: "activity", completed: false },
            { time: "20:30", task: "Private chef dinner experience", type: "dining", completed: false }
          ]
        },
        {
          day: 3,
          title: "Versailles VIP Experience",
          activities: [
            { time: "08:30", task: "Private luxury car to Versailles", type: "transport", completed: false },
            { time: "10:00", task: "VIP behind-the-scenes palace tour", type: "sightseeing", completed: false },
            { time: "12:30", task: "Private lunch in palace grounds", type: "dining", completed: false },
            { time: "14:30", task: "Exclusive gardens tour with historian", type: "activity", completed: false },
            { time: "16:30", task: "Private visit to Trianon palaces", type: "sightseeing", completed: false },
            { time: "18:30", task: "Return to Paris in luxury", type: "transport", completed: false }
          ]
        }
      ],
      accommodation: "5-star luxury hotel with Eiffel Tower view - $500-800/night",
      transport: "Private chauffeur, luxury cars, VIP transfers",
      highlights: ["Private guided tours", "Michelin-starred dining", "VIP experiences", "Luxury accommodations"]
    }
  },
  "Tokyo, Japan": {
    backpacker: {
      totalBudget: "$600-900",
      duration: "6 days",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Shibuya District",
          activities: [
            { time: "12:00", task: "Check into capsule hotel in Shibuya", type: "accommodation", completed: false },
            { time: "14:00", task: "Lunch at conveyor belt sushi restaurant", type: "dining", completed: false },
            { time: "15:30", task: "Experience Shibuya Crossing", type: "activity", completed: false },
            { time: "16:30", task: "Explore Harajuku and Takeshita Street", type: "activity", completed: false },
            { time: "18:00", task: "Visit Meiji Shrine (Free)", type: "sightseeing", completed: false },
            { time: "20:00", task: "Dinner at ramen shop", type: "dining", completed: false }
          ]
        },
        {
          day: 2,
          title: "Traditional Tokyo - Asakusa",
          activities: [
            { time: "09:00", task: "Travel to Asakusa via subway", type: "transport", completed: false },
            { time: "10:00", task: "Visit Senso-ji Temple", type: "sightseeing", completed: false },
            { time: "11:30", task: "Explore Nakamise Shopping Street", type: "activity", completed: false },
            { time: "13:00", task: "Traditional Japanese lunch", type: "dining", completed: false },
            { time: "15:00", task: "Walk through traditional neighborhoods", type: "activity", completed: false },
            { time: "17:00", task: "Public bath (onsen) experience", type: "activity", completed: false }
          ]
        }
      ],
      accommodation: "Capsule hotel or budget hostel - $25-40/night",
      transport: "7-day JR Pass for backpackers, subway day passes",
      highlights: ["Temple visits", "Street food tours", "Local neighborhood walks", "Public bath experiences"]
    },
    travelEnthusiast: {
      totalBudget: "$2200-3000",
      duration: "8 days",
      itinerary: [
        {
          day: 1,
          title: "Modern Tokyo Arrival",
          activities: [
            { time: "11:00", task: "Check into mid-range hotel in Ginza", type: "accommodation", completed: false },
            { time: "13:00", task: "Sushi lunch at Tsukiji Outer Market", type: "dining", completed: false },
            { time: "15:00", task: "Tokyo Skytree observation deck", type: "sightseeing", completed: false },
            { time: "17:00", task: "Traditional tea ceremony experience", type: "activity", completed: false },
            { time: "19:00", task: "Kaiseki dinner experience", type: "dining", completed: false }
          ]
        }
      ],
      accommodation: "3-star business hotel - $80-120/night",
      transport: "JR Pass, some taxi rides, airport transfers",
      highlights: ["Cultural experiences", "Food tours", "Temple visits", "Modern attractions"]
    },
    luxury: {
      totalBudget: "$5000-7500",
      duration: "10 days",
      itinerary: [
        {
          day: 1,
          title: "Luxury Arrival & Ginza",
          activities: [
            { time: "10:00", task: "Check into luxury ryokan with city view", type: "accommodation", completed: false },
            { time: "12:00", task: "Welcome tea ceremony in hotel", type: "dining", completed: false },
            { time: "14:00", task: "Private Tokyo city tour with guide", type: "sightseeing", completed: false },
            { time: "17:00", task: "Exclusive shopping in Ginza", type: "activity", completed: false },
            { time: "19:30", task: "Michelin 3-star restaurant dinner", type: "dining", completed: false }
          ]
        }
      ],
      accommodation: "Luxury ryokan or 5-star hotel - $400-700/night",
      transport: "Private car with driver, first-class train passes",
      highlights: ["Private cultural experiences", "Michelin dining", "Exclusive access", "Luxury accommodations"]
    }
  }
};

export const budgetTypes = {
  backpacker: {
    title: "Backpacker",
    subtitle: "Adventure on a Budget",
    description: "Perfect for budget travelers who want authentic experiences",
    color: "from-amber-600 to-orange-700",
    icon: "🎒"
  },
  travelEnthusiast: {
    title: "Travel Enthusiast", 
    subtitle: "Balanced Experience",
    description: "Great mix of comfort and adventure for memorable trips",
    color: "from-emerald-600 to-green-700",
    icon: "🌍"
  },
  luxury: {
    title: "Luxury",
    subtitle: "Premium Experience",
    description: "Indulge in the finest experiences and accommodations",
    color: "from-amber-700 to-yellow-800",
    icon: "✨"
  }
};