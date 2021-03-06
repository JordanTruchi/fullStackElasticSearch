exports.indexExist = async (client, index) => {
  return await client.indices.exists({
    index: index
  });
}

exports.indexPost = async (client, index, settings) => {
  return await client.indices.create({
    index: index,
    body: settings
  });
} 

exports.indexDelete = async (client, index) => {
  return await client.indices.delete({
    index: index
  });
}

exports.indexGetMapping = async (client, index) => {
  return await client.indices.getMapping({
    index: index
  });
} 

exports.indexPutSettings = async (client, index, body) => {
  return await client.indices.putSettings({
    index: index,
    body: body
  });
}

exports.indexPutSettings = async (client, index, body) => {
  return await client.indices.putSettings({
    index: index,
    body: body
  });
}

exports.indexRefresh = async (client, index) => {
  return await client.indices.refresh({
    index: index
  });
}


exports.addDocToIndex = async (client, index, body) => {
  return await client.index({
    index: index,
    body: body
  })
}

exports.countDocInIndex = async (client, index) => {
  return await client.count({
    index: index
  })
}

exports.bulkDocToIndex = async (client, index, dataSet) => {
  const data = await dataSet.flatMap(doc => [{ index: { _index: index } }, doc]);
  const { length: dataL } = data;
  let bulkResponse;
  let errorBulk;
  if(dataL < 100000) {
    bulkResponse  = await client.bulk({ body: data });
    bulkResponse = bulkResponse.body;
    errorBulk = bulkErrorHandler(bulkResponse);
    return bulkResponse;
  } else {
    while(data.length) {
      bulkResponse = await client.bulk({ body: data.splice(0,100000) });
      bulkResponse = bulkResponse.body;
      errorBulk = bulkErrorHandler(bulkResponse);     
    }
    return bulkResponse;
  }
}

function bulkErrorHandler(bulkResponse) {
  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    return erroredDocuments;
  } 
}


exports.searchInIndex = async (client, index, query) => {
  
  return await client.search({
    index: index,
    size: 10000,
    body: {
      query: {
        "bool": {
          "must_not": [
            {
              "term": {
                "state": 'pending'
              }
            }
          ],
          "should": [
            {"query_string" : {
              "query" : '*'+query+'*',
              "fields": ['name^2', 'state']
            }
          },
          {
            "nested" : {
              "path" : "author",
              "query": {
                "query_string" : {
                  "query" : '*'+query+'*',
                  "fields": ["author.fname", "author.lname", "author.email"]
                }
              }
            }
          },
          {
            "nested" : {
              "path" : "businessCore",
              "query": {
                "query_string" : {
                  "query" : '*'+query+'*',
                  "fields": ["businessCore.name^2"]
                }
              }
            }
          },
          {
            "nested" : {
              "path" : "highLevels",
              "query": {
                "query_string" : {
                  "query" : '*'+query+'*',
                  "fields": ["highLevels.name^2", "highLevels.content^3"]
                }
              }
            }
          },
          {
            "nested" : {
              "path" : "highLevels.lowLevels",
              "query": {
                "query_string" : {
                  "query" : '*'+query+'*',
                  "fields": ["highLevels.lowLevels.name^2", "highLevels.lowLevels.content^3"]
                }
              }
            }
          }
        ]
      }
    },
    "highlight" : {
      "pre_tags": [
        "<span class='hightLightSearch'>"
      ],
      "post_tags": [
        "</span>"
      ],
      "order": "score",
      "number_of_fragments": 9,
      "fields" : {
        "name" : {}, 
        "state" : {},
        "date" : {},
        "author.fname" : {},
        "author.lname" : {},
        "author.email" : {},
        "businessCore.id": {},
        "businessCore.name": {},
        "highLevels.name" : {}, 
        "highLevels.content" : {},
        "highLevels.lowLevels.name" : {}, 
        "highLevels.lowLevels.content" : {}
      }
    }
  }     
})
}