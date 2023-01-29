# fuzzy.js
Using GPT-3 as a back-end, called via HTML attributes.

# How to use

Add the "fuzzy" class to any span, and describe the data you want as a "fuzzy_atr" attribute.

<span class="fuzzy" fuzzy_atr="name"></span>

Then, call the fuzzyapi() and pass a description of what you want.

fuzzyapi("first US president")

This should add "George Washington" inside the span automatically.

