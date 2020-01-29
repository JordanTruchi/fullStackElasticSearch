exports.DOC_INDEX = "documents";

exports.DOC_INDEX_SETTINGS = {
    "mappings" : {
        "properties" : {
            "id": { "type": "integer" },
            "name" : { "type" : "text" },
            "state" : { "type" : "text" },
            "date" : { "type" : "date" },
            "author" : { "type" : "text" },
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
            "hightLevels": {
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
