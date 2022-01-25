# Noxintel
Get a collection of every registered business unit in Norway from The Brønnøysund Register Centre including the website URLs.

![MongoDB Compass](assets/en-units.jpg)

# What it does
It downloads a GZIP file that contains a JSON list (Over 1GB) of all registered businesses in Norway. This list updates every day at 05:00 AM GMT +1. It then collects website URLs from all the businesses and injects each object as a document in a Mongo DB collection. There will be aprox. 1,1M documents in the end.

### Purpose
There are over 1M registered businesses in Norway, and with Brønnøysund's Open data, we can process it and extract a lot more data about each business. You might have a consultancy business or some other type of business where analytical data is important. You can get business leads for free, or you can do anything else with the data you process and collect.

Extract more data from the URLs with these APIs.
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

# Notes
- BRREG does not give you the website URLs on their `/enhetsregisteret/api/enheter/lastned` endpoint. Although it is automated, it will attempt to make a `GET` request at the `https://data.brreg.no/enhetsregisteret/api/enheter/${id}` endpoint for each business to extract the website URLs and may take many hours to get all the websites. The project might result in high CPU usage, something that I am currently trying to fix.

- BRREG updates the registry at 05:00 (AM) GMT +1. Every bankrupt business will display a `bankrupt: true` property, and after a while, it will display `deleted: true`, in the end, this project will not even try to extract data from businesses that are due to deletion in BRREG. Please see types/unit-register for the translated schema. BRREG Does not supply English schema, and I have implemented code that translates the property names to English. String values are not yet translated but will be soon.

# Instructions

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
- [ ] Create a CLI
- [ ] Add filter options for data extraction
- [ ] Add more countries
- [ ] Optimize CPU usage
- [ ] Build a user interface
- [ ] Implement webcrawlers
- [ ] Build 3rd party API