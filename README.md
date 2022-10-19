# BeSpoked Bike Trail

### What?
BeSpoked is a high-end bicycle shop and Bike Trail is their sales tracking application.
### Why?
BeSpoked is introducing a new quarterly bonus based on sales as an incentive. This application was designed, to help track the commission and determine each salesperson’s quarterly bonus.

### How?
For this application, you will need Linux, NPX & NPM, and PostgreSQL installed.

1. Clone the repo to a local directory

2. Navigate to `.../bespoked-bike-trail/server` and run:
```
npm i
```
3. After npm installation, add a `.env` file with the following configurations:
```
DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}{HOST}:{PORT}/{DB_NAME}"
PORT=3002 (Can be anything unused)
CLIENT_URL=http://localhost:3000
```
4. Follow instructions found in:
```
.../bespoked-bike-trail/server/README.md
```
5. Open new terminal tab and navigate to `.../bespoked-bike-trail/client` and run:
```
npm i
```
6. After npm installation, add a `.env` file with the following configuration:
```
REACT_APP_SERVER_URL=http://localhost:3002
```
* Note: The port should match what was configured for server.  Notice how they are both currently 3002

7. Run `npm start`




## To add:
* Mobile device appropriate viewing
* Sales report to show quarterly earnings
