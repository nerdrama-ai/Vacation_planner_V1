import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from models import *
from typing import List, Optional
import secrets

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
destinations_collection = db.destinations
travel_plans_collection = db.travel_plans
user_trips_collection = db.user_trips

class DatabaseManager:
    
    @staticmethod
    async def create_destination(destination: DestinationCreate) -> Destination:
        """Create a new destination"""
        destination_obj = Destination(**destination.dict())
        await destinations_collection.insert_one(destination_obj.dict())
        return destination_obj
    
    @staticmethod
    async def get_destinations(popular_only: bool = False) -> List[Destination]:
        """Get all destinations or only popular ones"""
        query = {"popular": True} if popular_only else {}
        destinations = await destinations_collection.find(query).to_list(1000)
        return [Destination(**dest) for dest in destinations]
    
    @staticmethod
    async def get_destination_by_name(name: str) -> Optional[Destination]:
        """Find destination by name (case insensitive)"""
        destination = await destinations_collection.find_one({
            "name": {"$regex": f"^{name}$", "$options": "i"}
        })
        return Destination(**destination) if destination else None
    
    @staticmethod
    async def create_travel_plan(travel_plan: TravelPlanCreate) -> TravelPlan:
        """Create travel plan for a destination"""
        plan_obj = TravelPlan(**travel_plan.dict())
        await travel_plans_collection.insert_one(plan_obj.dict())
        return plan_obj
    
    @staticmethod
    async def get_travel_plan_by_destination(destination_name: str) -> Optional[TravelPlan]:
        """Get travel plan by destination name (case insensitive)"""
        plan = await travel_plans_collection.find_one({
            "destination_name": {"$regex": f"^{destination_name}$", "$options": "i"}
        })
        return TravelPlan(**plan) if plan else None
    
    @staticmethod
    async def create_user_trip(trip_data: UserTripCreate) -> UserTrip:
        """Create a new user trip"""
        trip_obj = UserTrip(**trip_data.dict())
        trip_obj.share_token = secrets.token_urlsafe(16)
        await user_trips_collection.insert_one(trip_obj.dict())
        return trip_obj
    
    @staticmethod
    async def get_user_trip(trip_id: str) -> Optional[UserTrip]:
        """Get user trip by ID"""
        trip = await user_trips_collection.find_one({"id": trip_id})
        return UserTrip(**trip) if trip else None
    
    @staticmethod
    async def get_user_trip_by_token(share_token: str) -> Optional[UserTrip]:
        """Get user trip by share token"""
        trip = await user_trips_collection.find_one({"share_token": share_token})
        return UserTrip(**trip) if trip else None
    
    @staticmethod
    async def update_trip_progress(trip_id: str, progress_update: UserTripUpdate) -> Optional[UserTrip]:
        """Update user trip progress"""
        result = await user_trips_collection.update_one(
            {"id": trip_id},
            {"$set": {"completed_activities": progress_update.completed_activities}}
        )
        
        if result.modified_count:
            return await DatabaseManager.get_user_trip(trip_id)
        return None
    
    @staticmethod
    async def calculate_progress_percentage(completed_activities: Dict[str, bool]) -> float:
        """Calculate completion percentage"""
        if not completed_activities:
            return 0.0
        
        total_activities = len(completed_activities)
        completed_count = sum(1 for completed in completed_activities.values() if completed)
        
        return round((completed_count / total_activities) * 100, 1) if total_activities > 0 else 0.0