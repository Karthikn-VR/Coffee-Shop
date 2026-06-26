from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


DATABASE_URL = "mysql+pymysql://root:%40Karthi2004@localhost:3306/coffee_shop"

engine = create_engine(DATABASE_URL, pool_pre_ping=True, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# from sqlalchemy import text

# try:
#     with engine.connect() as connection:
#         connection.execute(text("SELECT 1"))
#         print("Success")
# except Exception as e:
#     print("Failed")
#     print(e)