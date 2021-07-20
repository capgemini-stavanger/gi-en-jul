## Script that creates azure table storage tables
Run the script by typing `python filldb.py`. Arguments can be added to this call:
* `"-locevents?LOCATION1=EVENT1 LOCATION2=EVENT2"` (Specifies the locations and events that the tables should be created for) 
  * Defaults to `"-locevents?nittedal=jul21 sandnes=jul21 stavanger=jul21"`
* `-gcount?X` (Creates giver table with X entities for each location)
  * Defaults to `-gcount?120`
* `-rcount?X` (Creates recipient table with X entities for each location)
  * Defaults to `-rcount?100`

The tables created tables is placed in `./db_tables/TIMESTAMP`, where `TIMESTAMP` is the current unix timestamp. The tables can be easily be imported into the database with tools like Microsoft Azure Storage Explorer.