function fuzzyapi(description) {

  // Add your OpenAI API key here. Starts with "Bearer sk-..."
  openai_apikey = "";
  
  // Get all elements with class "fuzzy"
  var fuzzyElements = document.getElementsByClassName("fuzzy");
  // Create an empty array to store the unique fuzzy_atr values
  var fuzzyAttributes = [];
  var num_items = 0;
  // Iterate over each fuzzy element
  for (var i = 0; i < fuzzyElements.length; i++) {
    // Get the fuzzy_atr attribute of the current element
    var fuzzyattribute = fuzzyElements[i].getAttribute("fuzzy_atr");
    // Check if the current fuzzy_atr value is not in the array
    if (fuzzyAttributes.indexOf(fuzzyattribute) === -1) {
      // If it's not in the array, add it
      fuzzyAttributes.push(fuzzyattribute);
    }
  }

  for (var i = 0; i < fuzzyAttributes.length; i++) {
    var count = 0;
    for (var j = 0; j < fuzzyElements.length; j++) {
      var currentAttribute = fuzzyElements[j].getAttribute("fuzzy_atr");
      console.log(currentAttribute)
      if (fuzzyAttributes[i] === currentAttribute) {
        count++;
      }
    }
    if (num_items === 0) {
      num_items = count;
    } else if (num_items !== count) {
      num_items = 0;
    }
  }

  prompt = "Provide a JSON array of real data based on the following description of the app, keys requested,and number of items requested. Provide the answer as clean JSON data. Format the values to match the fomatting described in the keys requested. Provide the answer as well formatted minified JSON.###DESCRIPTION:"+description+"###KEYS REQUESTED"+fuzzyAttributes+"###NUMBER OF ITEMS REQUESTED:"+num_items+"###JSON DUMMY DATA:"
  $.ajax({
    url: 'https://api.openai.com/v1/completions',
    type: 'POST',
    data: JSON.stringify({
      'model':'text-davinci-002',
      'prompt': prompt,
      'max_tokens': 250,
      'temperature': 0.7
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': openai_apikey
    }
  })
  .done(function(response) {
    jsonArr = response.choices[0].text;
    jsonArr = JSON.parse(jsonArr);


      //loop through the jsonArr and update the matching span html
    j=0
    for (let j = 0; j < jsonArr.length; j++) {
      for (var key in jsonArr[j]) {
        var elements = document.querySelectorAll(`span[fuzzy_atr='${key}']`);
        for (var i = 0; i < elements.length; i++) {
          elements[i].innerHTML = jsonArr[i][key];
        }
      }
    }
  });




  

  
}
