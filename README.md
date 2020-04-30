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
    $('.select').jselect_search();
})
```
