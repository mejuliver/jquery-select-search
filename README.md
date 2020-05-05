# Select Search
A simple jquery search on select options plugin for your website

#### How To Use

Just create an html structure that contains select tag

e.g.

```
<div class="select">
    <select>
        <option value="">Select option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
    </select>
</div>
```
then initialize the plugin with your intended element target e.g.


```
$(function(){
    $('.select').jselect_search({
    		placeholder : '', // custom placeholder for the search input on the select dropdown, default to, `Search here...`
            searchable : true, // default to true, if true, show search box and allow search on items, otherwise if provided is a function then the search input output will be sent to that defined function instead and will not search on the items
    		fillable : false, // if allowed to create new item on the select dropdown upon enter on the search input, default to 
            on_top_edge : function(e){ // if you reach the top edge of the dropdown upon scrolling, this function will be called and the instance of the element will be pass on as argument, default to false

            },
            on_bottom_edge : function(e){ // if you reach the bottom edge of the dropdown upon scrolling, this function will be called and the instance of the element will be pass on as argument, default to false

            },
            on_change : function(e){ // on change event on the items upon selection of an item from the list, this function will trigger, passing the instance of the select element, otherwise, on change event will be ignored

            }
    	});
})
```