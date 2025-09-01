from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
from urllib.parse import unquote

# Import our models and database manager
from models import *
from database import DatabaseManager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Travel Planner API is running!"}

@api_router.get("/destinations", response_model=List[Destination])
async def get_destinations(popular: bool = False):
    """Get all destinations or only popular ones"""
    try:
        destinations = await DatabaseManager.get_destinations(popular_only=popular)
        return destinations
    except Exception as e:
        logging.error(f"Error getting destinations: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch destinations")

@api_router.get("/destinations/{destination_name}/plans", response_model=TravelPlansResponse)
async def get_travel_plans(destination_name: str):
    """Get travel plans for a specific destination"""
    try:
        # URL decode the destination name
        destination_name = unquote(destination_name)
        
        # Get travel plan from database
        travel_plan = await DatabaseManager.get_travel_plan_by_destination(destination_name)
        
        if not travel_plan:
            raise HTTPException(status_code=404, detail=f"Travel plans not found for {destination_name}")
        
        # Format response according to contract
        response = TravelPlansResponse(
            destination=travel_plan.destination_name,
            plans={
                "backpacker": travel_plan.backpacker,
                "travelEnthusiast": travel_plan.travel_enthusiast,
                "luxury": travel_plan.luxury
            }
        )
        
        return response
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting travel plans for {destination_name}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch travel plans")

@api_router.post("/trips", response_model=dict)
async def create_trip(trip_data: UserTripCreate):
    """Create a new user trip"""
    try:
        user_trip = await DatabaseManager.create_user_trip(trip_data)
        
        return {
            "tripId": user_trip.id,
            "message": "Trip saved successfully",
            "shareUrl": f"/trips/{user_trip.share_token}",
            "shareToken": user_trip.share_token
        }
    except Exception as e:
        logging.error(f"Error creating trip: {e}")
        raise HTTPException(status_code=500, detail="Failed to create trip")

@api_router.get("/trips/{trip_id}/progress", response_model=TripProgressResponse)
async def get_trip_progress(trip_id: str):
    """Get user trip progress"""
    try:
        user_trip = await DatabaseManager.get_user_trip(trip_id)
        
        if not user_trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        
        progress_percentage = await DatabaseManager.calculate_progress_percentage(
            user_trip.completed_activities
        )
        
        response = TripProgressResponse(
            trip_id=user_trip.id,
            destination=user_trip.destination,
            selected_budget=user_trip.selected_budget,
            completed_activities=user_trip.completed_activities,
            progress_percentage=progress_percentage
        )
        
        return response
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting trip progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch trip progress")

@api_router.put("/trips/{trip_id}/progress", response_model=dict)
async def update_trip_progress(trip_id: str, progress_update: UserTripUpdate):
    """Update user trip progress"""
    try:
        updated_trip = await DatabaseManager.update_trip_progress(trip_id, progress_update)
        
        if not updated_trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        
        progress_percentage = await DatabaseManager.calculate_progress_percentage(
            updated_trip.completed_activities
        )
        
        return {
            "message": "Progress updated successfully",
            "progressPercentage": progress_percentage
        }
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating trip progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to update trip progress")

@api_router.get("/trips/shared/{share_token}", response_model=UserTrip)
async def get_shared_trip(share_token: str):
    """Get a shared trip by token"""
    try:
        user_trip = await DatabaseManager.get_user_trip_by_token(share_token)
        
        if not user_trip:
            raise HTTPException(status_code=404, detail="Shared trip not found")
        
        return user_trip
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting shared trip: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch shared trip")

@api_router.post("/seed-database")
async def seed_database():
    """Seed the database with initial data"""
    try:
        from seed_data import seed_database
        await seed_database()
        return {"message": "Database seeded successfully"}
    except Exception as e:
        logging.error(f"Error seeding database: {e}")
        raise HTTPException(status_code=500, detail="Failed to seed database")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
