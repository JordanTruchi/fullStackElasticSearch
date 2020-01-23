'use strict';
const { DOC_INDEX, DOC_INDEX_SETTINGS} = require('./Models/documentsSettings.js');
const {PORT, BASE_URL, TIMEOUT, MAXRETRIES, SNIFFONSTART, HEADER} = require('./env.js');
const { buildClient } = require('./client.js');
const { indexExist, indexDelete, indexPost, indexGetMapping, addDocToIndex, bulkDocToIndex, indexPutSettings, indexRefresh, countDocInIndex, searchInIndex } = require('./Actions/indexActions.js');
const { dataSet } = require('./Actions/testExemple.js');

const client = buildClient(PORT, BASE_URL, TIMEOUT, MAXRETRIES, SNIFFONSTART, HEADER);

// initialise the server
async function run () {

  // check if index ixists
  const { body: indexEx } = await indexExist(client, DOC_INDEX);

  // delete it if it  exists
  if(indexEx) await indexDelete(client, DOC_INDEX);

  // create new index /// setting are set in order to optimize first indexation
  await indexPost(client, DOC_INDEX, DOC_INDEX_SETTINGS);

  // get mapping of index
  await indexGetMapping(client, DOC_INDEX);

  // get set of data to test
  const dataTest = await dataSet();
 
  console.time("indexing"); //43215.509ms / 1 M //// 458940.367ms / 10 M
  // bulk doc in the index // possibility to use addDocToIndex() to insert one
  await bulkDocToIndex(client, DOC_INDEX, dataTest);
  console.timeEnd("indexing"); 

  // set new settings to the index after indexation in order to optimize security
  await indexPutSettings(client, DOC_INDEX, {"settings" : {"number_of_replicas" : 2}});
  
  // refresh index in order to able the search
  await indexRefresh(client, DOC_INDEX) ;

  // check if the index contains all the doc bulk previously
  const { body: countDoc } = await countDocInIndex(client, DOC_INDEX);
  console.log(countDoc);

  console.time("searching"); // 159.888ms / 1 M /// 477.236ms / 10 M
  // search in all fields 
  const { body: responseBulk } = await searchInIndex(client, DOC_INDEX, 'ssu');
  /* console.log(responseBulk.hits.hits, responseBulk.hits.hits.length); */
  console.timeEnd("searching");
  client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
  });
  return responseBulk;
}

// run initialiase server
run().then(res => console.log(res.hits.hits.length)).catch(e => console.log(e));