# Noxintel
Get a collection of businesses in Norway

![MongoDB Compass](assets/en-units.jpg)

## Purpose
This project is mainly made for market research purposes.

## What it does
It streams a GZIP file that contains huge amounts of data and inserts that data in MongoDB. At the moment there are 1,1M registered units, but 88% of all businesses are missing websites.

Extract more data from the website URLs with these APIs.
- [Google adwords API](https://developers.google.com/adwords/api/docs/guides/start)
- [Google business API](https://developers.google.com/my-business/reference/rest)
- [Google lighthouse API](https://developers.google.com/web/tools/lighthouse)
- [Google Pagespeed insight API](https://developers.google.com/speed/docs/insights/v5/reference/)
- [Google webrisk API](https://cloud.google.com/web-risk/docs/reference/rest/)
- [Google Web Security Scanner API](https://cloud.google.com/security-scanner/docs/reference/rest/)
- [Google Safe Browsing API](https://developers.google.com/safe-browsing/v4/reference/rest/)
- [Google alert API](https://developers.google.com/admin-sdk/alertcenter)
- [Wappalyzer API](https://www.npmjs.com/package/wappalyzer)
- [Linkedin API](https://developer.linkedin.com/)
- [Crunchbase API](https://data.crunchbase.com/docs/using-the-api)

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop)
- [Mongo DB](https://docs.mongodb.com/manual/installation/)
- [MongoDB Compass (Interface for MongoDB)](https://www.mongodb.com/try/download/compass)
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- Min 8 GB Ram 

### Setup
Run `yarn setup` from root folder

Yarn setup will:
- Install all dependencies for the project
- Create a ENV file in packages/server
- Pull a MongoDB docker container

### Start the DB
`yarn db`

### Start the server
`yarn dev`

### Build
`yarn build:server`

### Todo
- [ ] Add more countries
- [ ] Build a user interface
- [ ] Implement webcrawlers
- [ ] Build APIs