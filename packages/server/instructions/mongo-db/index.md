### Install with Brew
`brew install --cask docker`

### Pull mongo with docker
`docker pull mongo:latest`

### Run with latest image
`docker run -d -p 2717:27017 -v ./data/db --name noxintel-db mongo:latest`

### Go inside container
`docker exec -it noxintel-db bash`

### Run mongo
`mongo`

### Show databases
`show dbs`

### Create database
`use noxintel`

### Create user
`db.user.insert({"name": "Username"})`

### Find user
`db.user.find()`

### exit
`exit`

### Access DB shell
`mongo`

### See statistics
`mongotop`

### Run DB container
`yarn db:start`

### Stop DB container
`yarn db:stop`

### Connect Compass
Remote: `mongodb://<ip>:<port>/?readPreference=primary&<db_name>-db=MongoDB%20Compass&ssl=false`

Localhost: `mongodb://localhost:2717/?readPreference=primary&noxintel-db=MongoDB%20Compass&ssl=false`

### Example
Add a document in Unit register

`import UnitRegister from '/@models/unit-register'`

`const unitRegister = new UnitRegister(<Object>)`

`unitRegister.save()`
