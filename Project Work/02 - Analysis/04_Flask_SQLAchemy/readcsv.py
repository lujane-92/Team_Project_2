import json
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, Float



from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()




from flask import Flask, jsonify

url = 'postgresql://{user}:{pw}@{url}/{db}'.format(user="postgres",pw="postgres",url="localhost",db="Internet_DB")





class Country_Data(Base):
  __tablename__ = "country_detail"
  index = Column(Integer, primary_key=True)
  Countries = Column(String)
  Internet_Users = Column(String)
  Penetration_percentage = Column(String)
  Population = Column(String)
  Region = Column(String)
  Longitude = Column(String)
  Latitude = Column(String)


class webindex(Base):
  __tablename__ = "webindex"
  index = Column(Integer, primary_key=True)
  Countries = Column(String)
  Overall_Score = Column(sqlalchemy.types.Float)
  Longitude = Column(sqlalchemy.types.Float)
  Latitude = Column(sqlalchemy.types.Float)
  Universal_Access = Column(sqlalchemy.types.Float)
  Freedom_and_Openness = Column(sqlalchemy.types.Float)
  Relevant_content = Column(sqlalchemy.types.Float)
  Empowerment = Column(sqlalchemy.types.Float)
  
class World_Internet(Base):
  __tablename__ = "world_details"
  index = Column(Integer, primary_key=True)
  World_Regions = Column(String)
  Population = Column(String)
  World_Population_Share = Column(String)
  Internet_Users = Column(String)
  Penetration_percentage = Column(String)
  Growth_between_2000_and_2020 = Column(String)
  World_Internet_User_Share = Column(String)

 

engine = create_engine(url)
Base.metadata.create_all(engine)



# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/InternetByCountry<br/>"
        f"/api/v1.0/WebIndex<br/>"
        f"/api/v1.0/WorldInternet<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )


@app.route("/api/v1.0/InternetByCountry")
#Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
def name():
    #Query result
    session = Session(bind=engine)
    Country_list=session.query(Country_Data.Countries,Country_Data.Internet_Users,Country_Data.Penetration_percentage,Country_Data.Population,Country_Data.Region,Country_Data.Longitude,Country_Data.Latitude).all()
    session.close()
    print(Country_Data)
    print(Country_list)
    #Create list containing information
    country_dict=[]
    for i in range(len( Country_list)):
        percentage=Country_list[i][2][0:len(Country_list[i][2])-2]
        country_dict.append({
            "Country": Country_list[i][0],
            "InternetUsers":int(Country_list[i][1]),
            "Percent_Population":int(round(float(percentage),0)),
            "Population":int(Country_list[i][3]),
            "Region":Country_list[i][4],
            "Location":[Country_list[i][6],Country_list[i][5]]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(country_dict)


@app.route("/api/v1.0/WebIndex")
def internet_index():
    #Query result
    session = Session(bind=engine)
    web_index_list=session.query(webindex.Countries,webindex.Overall_Score,webindex.Longitude,webindex.Latitude,webindex.Universal_Access,webindex.Freedom_and_Openness,webindex.Relevant_content,webindex.Empowerment).all()
    session.close()
    print(webindex)
    print(web_index_list)
    #Create list containing information
    web_index_dict=[]
    for i in range(len(web_index_list)):
        web_index_dict.append({
            "countries": web_index_list[i][0],
            "overalls":web_index_list[i][1],
            "universals":web_index_list[i][4],
            "freedoms":web_index_list[i][5],
            "relevant_content":web_index_list[i][6],
            "empowerment":web_index_list[i][7],
            "location":[float(web_index_list[i][3]),float(web_index_list[i][2])]
        })
    #Return the JSON representation of your dictionary.
    return jsonify(web_index_dict)

@app.route("/api/v1.0/WorldInternet")
def world_internet():
    #Query result
    session = Session(bind=engine)
    wrold_internet_stats=session.query(World_Internet.World_Regions,World_Internet.Population,World_Internet.World_Population_Share,World_Internet.Internet_Users,World_Internet.Penetration_percentage,World_Internet.Growth_between_2000_and_2020,World_Internet.World_Internet_User_Share).all()
    session.close()
    print(World_Internet)
    print(wrold_internet_stats)
    #Create list containing information
    world_web_dict=[]
    for i in range(len(wrold_internet_stats)-1):
        Growth=wrold_internet_stats[i][5][0:len(wrold_internet_stats[i][5])-2]
        print(Growth)
        Growth1=Growth.split(",")
        print(Growth.split(","))
        Growth2=''.join(Growth1)
        print(Growth2)
        world_web_dict.append({
            "World Regions": wrold_internet_stats[i][0],
            "Population":wrold_internet_stats[i][1],
            "Population_Perc_of_World":float(wrold_internet_stats[i][2][0:len(wrold_internet_stats[i][2])-2])/100,
            "Internet_Users":wrold_internet_stats[i][3],
            "Penetration_Rate":float(wrold_internet_stats[i][4][0:len(wrold_internet_stats[i][4])-2])/100,
            "Growth_2000_2020":float(Growth2)/100,
            "Internet_World_Perc":float(wrold_internet_stats[i][6][0:len(wrold_internet_stats[i][6])-2])/100
        })
    #Return the JSON representation of your dictionary.
    return  jsonify(world_web_dict)


if __name__ == "__main__":
    app.run(debug=True)



