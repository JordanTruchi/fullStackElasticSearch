exports.DOC_INDEX = "documents";

exports.DOC_INDEX_SETTINGS = {
    "mappings" : {
        "properties" : {
            "name" : { "type" : "text" },
            "state" : { "type" : "text" },
            "date" : { "type" : "text" },
            "author" : { "type" : "text" },
            "businessCore" : { "type" : "text" },
            "hightLevels": {
                "type": "nested",
                "properties": {
                  "name": { "type" : "text" },
                  "content": { "type" : "text" },
                  "lowLevels": {
                    "type": "nested",
                    "properties": {
                      "name": { "type" : "text" },
                      "content": { "type" : "text" }
                    }
                  }
                }
            }
        }
    },
    "settings" : {
      "number_of_shards" : 5,
      "number_of_replicas" : 0,
      "refresh_interval": -1
    } 
}
