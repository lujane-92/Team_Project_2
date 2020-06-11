import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from flask import Flask, jsonify

url = 'postgresql://{user}:{pw}@{url}/{db}'.format(user="postgres",pw="postgres",url="localhost",db="Internet_DB")



#class Test(Base):
#  __tablename__ = "test"
#  index = Column(Integer, primary_key=True)
#  id = Column(String)
#  iso2Code = Column(String)
#  name = Column(String)
#  region = Column(String)
#  adminregion = Column(String)
#  incomeLevel = Column(String)
#  lendingType = Column(String)
#  capitalCity = Column(String)
#  longitude = Column(String)
#  latitude = Column(String)


class Country_Data(Base):
  __tablename__ = "country_detail"
  index = Column(Integer, primary_key=True)
  Countries = Column(String)
  Internet_Users = Column(String)
  Penetration_percentage = Column(String)
  Population = Column(String)
  Region = Column(String)
  Longitude = Column(sqlalchemy.types.Float)
  Latitude = Column(sqlalchemy.types.Float)
 

engine = create_engine(url)
Base.metadata.create_all(engine)

#session = Session(bind=engine)
#Name_list=session.query(Test.name,Test.longitude).order_by(Test.longitude).all()
#session.close()
#print(Name_list)

# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )


@app.route("/api/v1.0/precipitation")
#Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
def name():
    #Start Session
    session = Session(bind=engine)

    #Query result
    #Data_Table = session.query(Test)
    Country_list=session.query(Country_Data.Countries,Country_Data.Internet_Users,Country_Data.Penetration_percentage,Country_Data.Longitude,Country_Data.Latitude).all()
    session.close()
    print( Country_list)
    #Create list containing information
    test_dict=[]
    for i in range(len( Country_list)):
        test_dict.append({
            "Country": Country_list[i][0],
            "Longitude":Country_list[i][3],
            "Latitude":Country_list[i][4],
            "Internet Users":Country_list[i][1],
            "Penetration percentage among population":Country_list[i][2]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(test_dict)

if __name__ == "__main__":
    app.run(debug=True)


