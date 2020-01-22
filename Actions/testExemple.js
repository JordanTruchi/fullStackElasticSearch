const test1AddDocToIndex = {
    name: 'yo',
    state: 'dffdfd',
    date: 'yoyoyyo',
    author: 'yoyoyyo',
    businessCore: 'yoyoyyo',
    hightLevels: [
        {
          name: "hightName",
          content: "hightContent",
          lowLevels: [
              {
                  name: "lowName",
                  content: "pussu",
              },
              {
                  name: "lowName",
                  content: "lowContent",
              }
          ]
        },
        {
          name: "hightName",
          content: "hightContent",
          lowLevels: [
              {
                  name: "lowName",
                  content: "lowContent",
              },
              {
                  name: "yi",
                  content: "lowContent",
              }
          ]
        }
    ]
  }

  const test2AddDocToIndex = {
    name: 'yi',
    state: 'A mind needs pussu like a sword needs a whetstone.',
    date: 'yi',
    author: 'yi',
    businessCore: 'yi',
    hightLevels: [
        {
          name: "yi",
          content: "hightContent",
          lowLevels: [
              {
                  name: "lowName",
                  content: "lowContent",
              },
              {
                  name: "lowName",
                  content: "lowContent",
              }
          ]
        },
        {
          name: "hightName",
          content: "hightContent",
          lowLevels: [
              {
                  name: "ya",
                  content: "lowContent",
              },
              {
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
    for (let index = 0; index < 10; index++) {
        if(isOdd(index)) dataSet.push(test1AddDocToIndex);
        else dataSet.push(test2AddDocToIndex)
        
    }
    console.log(dataSet.length);
    return dataSet;
}