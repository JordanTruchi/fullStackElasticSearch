exports.DOC_INDEX = "documents";

exports.DOC_INDEX_SETTINGS = {
    "mappings" : {
        "properties" : {
            "id": { "type": "integer" },
            "name" : { "type" : "text" },
            "state" : { "type" : "text" },
            "date" : { "type" : "date" },
            "author" : {
              "type": "nested",
              "properties" : {
                "id": { "type": "integer" },
                "role": { "type": "text" },
                "email": { "type": "text" },
                "fname": { "type": "text" },
                "lname": { "type": "text" }
              }
            },
            "businessCore" : {
              "type": "nested",
              "properties": {
                "id": { "type": "integer" },
                "name": { 
                  "type": "text",
                  "fields": {
                    "keyword": { 
                      "type": "keyword"
                    }
                  }
                }
              }
            },
            "highLevels": {
                "type": "nested",
                "properties": {
                  "id": { "type": "integer" },
                  "name": { "type" : "text" },
                  "content": { "type" : "text" },
                  "lowLevels": {
                    "type": "nested",
                    "properties": {
                      "id": { "type": "integer" },
                      "name": { "type" : "text" },
                      "content": { "type" : "text" }
                    }
                  }
                }
            }
        }
    },
    "settings" : {
      "number_of_shards" : 9,
      "number_of_replicas" : 0,
      "refresh_interval": -1
    } 
}
