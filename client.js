const { Client } = require('@elastic/elasticsearch')

exports.buildClient = (PORT, BASE_URL, TIMEOUT, MAXRETRIES, SNIFFONSTART, HEADER) => new Client({
    node: BASE_URL+':'+PORT,
    maxRetries: MAXRETRIES, 
    requestTimeout: TIMEOUT,
    sniffOnStart: SNIFFONSTART,
    headers: HEADER
  })