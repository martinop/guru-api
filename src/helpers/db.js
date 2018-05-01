import pgp from 'pg-promise'
const pgURI = 'postgres://postgres:masterkey@localhost:5432/guru'

export default pgp()(pgURI);

