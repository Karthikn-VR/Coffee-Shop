from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from database import engine, get_db, Base
import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Pydantic schemas ----------
class Ingredient(BaseModel):
    id: int
    name: str
    category: str


class Customer(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    instructions: str


class OrderDetails(BaseModel):
    ingredients: List[Ingredient]
    cupSize: str
    extraToppings: List[str]
    subtotal: float
    promoCode: str
    discount: float
    total: float


class OrderRequest(BaseModel):
    customer: Customer
    order: OrderDetails
    timestamp: str


# ---------- Routes ----------
@app.post("/api/orders")
def place_order(payload: OrderRequest, db: Session = Depends(get_db)):
    try:
        # Parse ISO timestamp from frontend (e.g. "2026-01-15T10:30:00.000Z")
        ts = datetime.fromisoformat(payload.timestamp.replace("Z", "+00:00"))

        new_order = models.Order(
            customer_name=payload.customer.name,
            phone=payload.customer.phone,
            email=payload.customer.email,
            instructions=payload.customer.instructions,
            cup_size=payload.order.cupSize,
            subtotal=payload.order.subtotal,
            promo_code=payload.order.promoCode,
            discount=payload.order.discount,
            total=payload.order.total,
            timestamp=ts,
        )

        # Add ingredients
        for ing in payload.order.ingredients:
            new_order.ingredients.append(
                models.OrderIngredient(
                    ingredient_id=ing.id,
                    name=ing.name,
                    category=ing.category,
                )
            )

        # Add toppings
        for topping_id in payload.order.extraToppings:
            new_order.toppings.append(
                models.OrderTopping(topping_id=topping_id)
            )

        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        print(f"Order #{new_order.id} saved for {new_order.customer_name}")

        return {
            "success": True,
            "message": "Order received and saved",
            "order_id": new_order.id,
        }

    except Exception as e:
        db.rollback()
        print("Error saving order:", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to save order: {str(e)}")


@app.get("/api/orders")
def list_orders(db: Session = Depends(get_db)):
    """Optional: Fetch all orders to verify they were saved."""
    orders = db.query(models.Order).order_by(models.Order.id.desc()).all()
    return [
        {
            "id": o.id,
            "customer": o.customer_name,
            "phone": o.phone,
            "cup_size": o.cup_size,
            "total": float(o.total),
            "ingredients": [i.name for i in o.ingredients],
            "toppings": [t.topping_id for t in o.toppings],
            "timestamp": o.timestamp.isoformat(),
        }
        for o in orders
    ]