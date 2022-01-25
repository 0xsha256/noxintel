# BRREG Data
BRREG updates their unit register at 05:00 AM every day. This means that a cron job must run right after that and check if units are deleted, have website changes etc.

### Known problems
- When BRREG has registered a unit deleted the day prior, no response will be given for deleted resources the day after.

## Endpoints

### Org forms
https://data.brreg.no/enhetsregisteret/api/docs/index.html#organisasjonsformer-alle-hent
## Municipalities
https://data.brreg.no/enhetsregisteret/api/docs/index.html#kommuner-alle-hent
## Roles
https://data.brreg.no/enhetsregisteret/api/roller/rolletyper
## all roles for a unit
https://data.brreg.no/enhetsregisteret/api/docs/index.html#_roller
