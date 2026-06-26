from sqlalchemy import Column, Integer, String, Text, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    instructions = Column(Text, nullable=True)
    cup_size = Column(String(50), nullable=False)
    subtotal = Column(DECIMAL(10, 2), nullable=False)
    promo_code = Column(String(100), nullable=True)
    discount = Column(DECIMAL(10, 2), default=0)
    total = Column(DECIMAL(10, 2), nullable=False)
    timestamp = Column(DateTime, nullable=False)

    ingredients = relationship("OrderIngredient", back_populates="order", cascade="all, delete-orphan")
    toppings = relationship("OrderTopping", back_populates="order", cascade="all, delete-orphan")


class OrderIngredient(Base):
    __tablename__ = "order_ingredients"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    ingredient_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)

    order = relationship("Order", back_populates="ingredients")


class OrderTopping(Base):
    __tablename__ = "order_toppings"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    topping_id = Column(String(100), nullable=False)

    order = relationship("Order", back_populates="toppings")