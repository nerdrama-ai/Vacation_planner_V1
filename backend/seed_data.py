import os
from pathlib import Path
from dotenv import load_dotenv
from database import DatabaseManager
from models import *
import asyncio

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Seed data based on mockData.js
async def seed_database():
    """Seed the database with initial travel data"""
    
    # Create destinations
    destinations_data = [
        {"name": "Paris, France", "country": "France", "popular": True},
        {"name": "Tokyo, Japan", "country": "Japan", "popular": True},
        {"name": "New York, USA", "country": "United States", "popular": True},
        {"name": "Bali, Indonesia", "country": "Indonesia", "popular": True},
        {"name": "London, UK", "country": "United Kingdom", "popular": True},
        {"name": "Barcelona, Spain", "country": "Spain", "popular": True},
    ]
    
    for dest_data in destinations_data:
        destination = DestinationCreate(**dest_data)
        await DatabaseManager.create_destination(destination)
    
    # Create Paris travel plan
    paris_plan = TravelPlanCreate(
        destination_id="paris_france",
        destination_name="Paris, France",
        backpacker=BudgetPlan(
            total_budget="$800-1200",
            duration="5 days",
            accommodation="Hostel in Montmartre - $25-35/night",
            transport="Metro day passes - $8/day, Walking tours",
            highlights=["Free walking tours", "Street art exploration", "Local market visits", "Budget-friendly bistros"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Arrival & Montmartre Exploration",
                    activities=[
                        Activity(time="10:00", task="Check into hostel in Montmartre", type="accommodation"),
                        Activity(time="12:00", task="Lunch at local bistro", type="dining"),
                        Activity(time="14:00", task="Visit Sacré-Cœur Basilica (Free)", type="sightseeing"),
                        Activity(time="16:00", task="Explore Montmartre streets & street art", type="activity"),
                        Activity(time="18:00", task="Sunset viewing from Montmartre steps", type="activity"),
                        Activity(time="20:00", task="Dinner at affordable local restaurant", type="dining")
                    ]
                ),
                DayItinerary(
                    day=2,
                    title="Historic Paris & Seine Walk",
                    activities=[
                        Activity(time="09:00", task="Walk to Notre-Dame area", type="transport"),
                        Activity(time="10:00", task="Explore Notre-Dame exterior & Sainte-Chapelle", type="sightseeing"),
                        Activity(time="12:00", task="Picnic lunch along Seine River", type="dining"),
                        Activity(time="14:00", task="Walk through Latin Quarter", type="activity"),
                        Activity(time="16:00", task="Visit Panthéon", type="sightseeing"),
                        Activity(time="18:00", task="Evening stroll along Seine", type="activity")
                    ]
                ),
                DayItinerary(
                    day=3,
                    title="Louvre & Tuileries",
                    activities=[
                        Activity(time="09:00", task="Early entry to Louvre Museum", type="sightseeing"),
                        Activity(time="12:00", task="Lunch in Tuileries Garden", type="dining"),
                        Activity(time="14:00", task="Explore Tuileries Garden", type="activity"),
                        Activity(time="16:00", task="Walk to Place de la Concorde", type="activity"),
                        Activity(time="17:00", task="Visit local market", type="activity"),
                        Activity(time="19:00", task="Dinner at budget-friendly bistro", type="dining")
                    ]
                )
            ]
        ),
        travel_enthusiast=BudgetPlan(
            total_budget="$1800-2500",
            duration="7 days",
            accommodation="3-star boutique hotel - $120-180/night",
            transport="Metro passes, some taxis, train to Versailles",
            highlights=["Priority museum access", "Seine river cruise", "Versailles day trip", "Guided tours"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Arrival & Champs-Élysées",
                    activities=[
                        Activity(time="11:00", task="Check into boutique hotel near Louvre", type="accommodation"),
                        Activity(time="13:00", task="Lunch at Café de Flore", type="dining"),
                        Activity(time="15:00", task="Walk down Champs-Élysées", type="activity"),
                        Activity(time="16:30", task="Arc de Triomphe visit & climb", type="sightseeing"),
                        Activity(time="18:00", task="Evening Seine river cruise", type="activity"),
                        Activity(time="20:00", task="Dinner at traditional French restaurant", type="dining")
                    ]
                ),
                DayItinerary(
                    day=2,
                    title="Louvre & Île de la Cité",
                    activities=[
                        Activity(time="09:00", task="Priority access Louvre Museum tour", type="sightseeing"),
                        Activity(time="12:30", task="Lunch at museum café", type="dining"),
                        Activity(time="14:00", task="Visit Sainte-Chapelle", type="sightseeing"),
                        Activity(time="15:30", task="Explore Île Saint-Louis", type="activity"),
                        Activity(time="17:00", task="Coffee at famous Berthillon ice cream shop", type="dining"),
                        Activity(time="19:00", task="Seine sunset walk", type="activity")
                    ]
                ),
                DayItinerary(
                    day=3,
                    title="Versailles Day Trip",
                    activities=[
                        Activity(time="08:00", task="Train to Versailles", type="transport"),
                        Activity(time="09:30", task="Palace of Versailles guided tour", type="sightseeing"),
                        Activity(time="12:00", task="Lunch in Versailles town", type="dining"),
                        Activity(time="14:00", task="Explore Versailles Gardens", type="activity"),
                        Activity(time="16:00", task="Marie Antoinette's Estate visit", type="sightseeing"),
                        Activity(time="18:00", task="Return to Paris", type="transport")
                    ]
                )
            ]
        ),
        luxury=BudgetPlan(
            total_budget="$4000-6000",
            duration="7 days",
            accommodation="5-star luxury hotel with Eiffel Tower view - $500-800/night",
            transport="Private chauffeur, luxury cars, VIP transfers",
            highlights=["Private guided tours", "Michelin-starred dining", "VIP experiences", "Luxury accommodations"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Luxury Arrival & Private Tour",
                    activities=[
                        Activity(time="10:00", task="Check into 5-star hotel with Eiffel Tower view", type="accommodation"),
                        Activity(time="12:00", task="Welcome champagne at hotel bar", type="dining"),
                        Activity(time="14:00", task="Private chauffeur city orientation tour", type="transport"),
                        Activity(time="16:00", task="VIP Eiffel Tower experience with skip-the-line", type="sightseeing"),
                        Activity(time="18:00", task="Private champagne tasting", type="activity"),
                        Activity(time="20:00", task="Michelin-starred restaurant dinner", type="dining")
                    ]
                ),
                DayItinerary(
                    day=2,
                    title="Private Louvre & Seine Luxury",
                    activities=[
                        Activity(time="09:00", task="Private Louvre curator-led tour", type="sightseeing"),
                        Activity(time="12:00", task="Lunch at Le Meurice restaurant", type="dining"),
                        Activity(time="14:30", task="Private Seine yacht cruise", type="activity"),
                        Activity(time="16:30", task="Exclusive shopping on Rue Saint-Honoré", type="activity"),
                        Activity(time="18:00", task="Spa treatment at hotel", type="activity"),
                        Activity(time="20:30", task="Private chef dinner experience", type="dining")
                    ]
                ),
                DayItinerary(
                    day=3,
                    title="Versailles VIP Experience",
                    activities=[
                        Activity(time="08:30", task="Private luxury car to Versailles", type="transport"),
                        Activity(time="10:00", task="VIP behind-the-scenes palace tour", type="sightseeing"),
                        Activity(time="12:30", task="Private lunch in palace grounds", type="dining"),
                        Activity(time="14:30", task="Exclusive gardens tour with historian", type="activity"),
                        Activity(time="16:30", task="Private visit to Trianon palaces", type="sightseeing"),
                        Activity(time="18:30", task="Return to Paris in luxury", type="transport")
                    ]
                )
            ]
        )
    )
    
    await DatabaseManager.create_travel_plan(paris_plan)
    
    # Create Tokyo travel plan
    tokyo_plan = TravelPlanCreate(
        destination_id="tokyo_japan",
        destination_name="Tokyo, Japan",
        backpacker=BudgetPlan(
            total_budget="$600-900",
            duration="6 days",
            accommodation="Capsule hotel or budget hostel - $25-40/night",
            transport="7-day JR Pass for backpackers, subway day passes",
            highlights=["Temple visits", "Street food tours", "Local neighborhood walks", "Public bath experiences"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Arrival & Shibuya District",
                    activities=[
                        Activity(time="12:00", task="Check into capsule hotel in Shibuya", type="accommodation"),
                        Activity(time="14:00", task="Lunch at conveyor belt sushi restaurant", type="dining"),
                        Activity(time="15:30", task="Experience Shibuya Crossing", type="activity"),
                        Activity(time="16:30", task="Explore Harajuku and Takeshita Street", type="activity"),
                        Activity(time="18:00", task="Visit Meiji Shrine (Free)", type="sightseeing"),
                        Activity(time="20:00", task="Dinner at ramen shop", type="dining")
                    ]
                ),
                DayItinerary(
                    day=2,
                    title="Traditional Tokyo - Asakusa",
                    activities=[
                        Activity(time="09:00", task="Travel to Asakusa via subway", type="transport"),
                        Activity(time="10:00", task="Visit Senso-ji Temple", type="sightseeing"),
                        Activity(time="11:30", task="Explore Nakamise Shopping Street", type="activity"),
                        Activity(time="13:00", task="Traditional Japanese lunch", type="dining"),
                        Activity(time="15:00", task="Walk through traditional neighborhoods", type="activity"),
                        Activity(time="17:00", task="Public bath (onsen) experience", type="activity")
                    ]
                )
            ]
        ),
        travel_enthusiast=BudgetPlan(
            total_budget="$2200-3000",
            duration="8 days",
            accommodation="3-star business hotel - $80-120/night",
            transport="JR Pass, some taxi rides, airport transfers",
            highlights=["Cultural experiences", "Food tours", "Temple visits", "Modern attractions"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Modern Tokyo Arrival",
                    activities=[
                        Activity(time="11:00", task="Check into mid-range hotel in Ginza", type="accommodation"),
                        Activity(time="13:00", task="Sushi lunch at Tsukiji Outer Market", type="dining"),
                        Activity(time="15:00", task="Tokyo Skytree observation deck", type="sightseeing"),
                        Activity(time="17:00", task="Traditional tea ceremony experience", type="activity"),
                        Activity(time="19:00", task="Kaiseki dinner experience", type="dining")
                    ]
                )
            ]
        ),
        luxury=BudgetPlan(
            total_budget="$5000-7500",
            duration="10 days",
            accommodation="Luxury ryokan or 5-star hotel - $400-700/night",
            transport="Private car with driver, first-class train passes",
            highlights=["Private cultural experiences", "Michelin dining", "Exclusive access", "Luxury accommodations"],
            itinerary=[
                DayItinerary(
                    day=1,
                    title="Luxury Arrival & Ginza",
                    activities=[
                        Activity(time="10:00", task="Check into luxury ryokan with city view", type="accommodation"),
                        Activity(time="12:00", task="Welcome tea ceremony in hotel", type="dining"),
                        Activity(time="14:00", task="Private Tokyo city tour with guide", type="sightseeing"),
                        Activity(time="17:00", task="Exclusive shopping in Ginza", type="activity"),
                        Activity(time="19:30", task="Michelin 3-star restaurant dinner", type="dining")
                    ]
                )
            ]
        )
    )
    
    await DatabaseManager.create_travel_plan(tokyo_plan)
    
    print("✅ Database seeded successfully with destinations and travel plans!")

if __name__ == "__main__":
    asyncio.run(seed_database())