# desription
the ayi layer of ayafeed, provide the crud api for events, atrists, circles and etc.

## step
1. init program struct
2. connect to d1 database: local connection & cf config dev  
3. design standar router struct: /api/events/[id] 
4. write standar API: GET
5. dev enviroment debug
6. deploy to cf

## feature
- pagination, filter, sort
- more unit test
- CRUD test
- postman test
- API doc

## query list:
- all events    | done
- all artists   | done
- all circles   | done
- events by id, time, location, description | done
- artists by id, name       | done
- circles by id, name, description, event 
- appearances by 