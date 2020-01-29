const test1AddDocToIndex = {
    id: 0,
    name: 'yo',
    state: '1.1',
    date: '2019-06-10',
    author: 'yoyoyyo',
    businessCore: [
        {
            id: 0,
            name: 'sss'
        },
        {
            id: 0,
            name: 'hahahaha'
        }
    ],
    hightLevels: [
        {
          id: 0,
          name: "hightName",
          content: "hightContent",
          lowLevels: [
              {
                  id: 0,
                  name: "lowName",
                  content: "ddddd",
              },
              {
                  id: 0,
                  name: "lowName",
                  content: "lowContent",
              }
          ]
        },
        {
          id: 0,
          name: "hightName",
          content: "pussu",
          lowLevels: [
              {
                  id: 0,
                  name: "lowName",
                  content: "lowContent",
              },
              {
                  id: 0,
                  name: "yi",
                  content: "lowContent",
              }
          ]
        }
    ]
  }

  const test2AddDocToIndex = {
    id: 0,
    name: 'yi',
    state: '1.1',
    date: '2020-06-10',
    author: 'yi',
    businessCore: [
        {
            id: 0,
            name: 'pussu'
        },
        {
            id: 0,
            name: 'hahahaha'
        }
    ],
    hightLevels: [
        {
          id: 0,
          name: "yi",
          content: "hightContent",
          lowLevels: [
              {
                  id: 0,
                  name: "lowName",
                  content: "lowContent",
              },
              {
                  id: 0,
                  name: "lowName",
                  content: "lowContent",
              }
          ]
        },
        {
          id: 0,
          name: "hightName",
          content: "hightContent",
          lowLevels: [
              {
                  id: 0,
                  name: "ya",
                  content: "lowContent",
              },
              {
                  id: 0,
                  name: "ya",
                  content: "yo",
              }
          ]
        }
    ]
  }
function isOdd(num) { return num % 2;}
exports.dataSet = async () => {
    let dataSet = [];
    for (let index = 0; index < 10000; index++) {
        if(isOdd(index)) {
            test1AddDocToIndex.id = Math.random(0, 100000000);
            test1AddDocToIndex.businessCore[0].id = Math.random(0, 100000000);
            test1AddDocToIndex.businessCore[1].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[0].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[0].lowLevels[0].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[0].lowLevels[1].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[1].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[1].lowLevels[0].id = Math.random(0, 100000000);
            test1AddDocToIndex.hightLevels[1].lowLevels[1].id = Math.random(0, 100000000);
            dataSet.push(test1AddDocToIndex);
        } 
        else {
            test2AddDocToIndex.id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[0].id = Math.random(0, 100000000);
            test2AddDocToIndex.businessCore[0].id = Math.random(0, 100000000);
            test2AddDocToIndex.businessCore[1].id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[0].lowLevels[0].id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[0].lowLevels[1].id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[1].id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[1].lowLevels[0].id = Math.random(0, 100000000);
            test2AddDocToIndex.hightLevels[1].lowLevels[1].id = Math.random(0, 100000000);
            dataSet.push(test2AddDocToIndex)
        }
    }
    console.log(dataSet.length);
    return dataSet;
}