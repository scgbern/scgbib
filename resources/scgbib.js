/*
  This code was originally written by Alexandru Filipescu as 
  the front-end of the citation search engine.
  https://github.com/AlexandruFilipescu/Citation-Search-Engine
*/

$(document).ready(function()
{
       var definitiveObjectArray;
       var objectArray;
       var textString, textArray;
       // fetch('http://scg.unibe.ch/download/scgbib/scgbib.json')
      fetch('./scgbib.json')
      .then(response => response.json())
      .then(data => {
        definitiveObjectArray = data;
        changeState();
      })

      let itemTemplateString = document.getElementById('item-template').innerHTML;
      let renderItem = Handlebars.compile(itemTemplateString);

      function filterIt(searchTags)
      {   
          return objectArray.filter(object => 
              searchTags.every(tag => Object.values(object)  // ACCOR02a","type": "techreport","AUTHOR": "Nierstrasz",
              .some(value => value.includes(tag)) //"Nierstrasz"
              ));
      }

      function showResults(totalResults)
      {
        console.log('total results: ' + totalResults.length);
        $('#resultsText').text('Number of results returned: ' + totalResults.length);
        $('#resultsText').show('fast');
      }

      function search(object)
      {
        textString =  getQueryValues('query');  
        textArray = textString.split(' ');

        objectArray = object;
        objectArray = filterIt(textArray);

        showResults(objectArray);

        $('#accordion').empty();
        let renderedItem = renderItem({items: objectArray});
        $('#accordion').append(renderedItem);
        
      }

      function getQueryValues(type)
      {   const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          if(urlParams.has(type))
          {
            return urlParams.get(type);
          } else{
            return 'Search here...';
          }
      }

      function getSelectorValue()
      {
        var selectedFilter = $('select').children("option:selected").val();
        return selectedFilter;
      }

      function queryKeyExists(type)
      {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          if(urlParams.has(type))
          {
            return true;
          } else{
            return false;
          }
      }

      function modifyUrl()
      {
          var inputValues = $('#searchForm').val();
          var selectedFilter = getSelectorValue();
          let params = new URLSearchParams();
          if(inputValues)
          {
            params.set('query', inputValues);
            params.set('filter', selectedFilter);
            window.history.pushState('', "New page Title",'?' + params.toString());
          } else{
            params.set('query', '');
            console.log('Empty URL values.');
          }
      }

      function setInputValue()
      { var queryValues = getQueryValues('query')
        if(queryValues){
          $('#searchForm').val(queryValues);
        } 
      }

      function setFilterValue()
       {
        var selectedFilter;
        if (queryKeyExists('filter')) {
          filterValue = getQueryValues('filter');
          selectedFilter = filterValue;
          $('select').val(filterValue);
        } else {
          selectedFilter = getSelectorValue();
        }
        return selectedFilter;
      }

      function getSortOrder(prop)
      {
        return function(a,b) {
          if(a[prop] > b[prop]){
            return 1;
          } else if (a[prop] < b[prop]){
            return -1;
          } 
          return 0;
         }
      }

      function getSortCatOrder(prop)
      {
        return function(a,b) {
          if(a[prop] > b[prop]){
            return 1;
          } else if (a[prop] < b[prop]){
            return -1;
          } else if(a[prop] === b[prop]){
            return  b['YEAR'] - a['YEAR'];
          }
        }
      }

      function filterByCategory() 
      {
        var orderedObjCateg = objectArray;
        orderedObjCateg.sort(getSortOrder('type'));
        var categories = orderedObjCateg.map(({ type }) => type);
        window.uniqueOrdCateg = [...new Set(categories)];
        search(orderedObjCateg);
      }
           
      function filterByYear() 
      {
        var orderedObjYear = objectArray;
        orderedObjYear.sort((a, b) => b.YEAR - a.YEAR);
        var years = orderedObjYear.map(({ YEAR }) => YEAR);
        window.uniqueOrdYears = [...new Set(years)];
        search(orderedObjYear);
      }

      function filterByCatYear() 
      {
        var orderedObjCateg = objectArray;
        orderedObjCateg.sort(getSortCatOrder('type'));
        var categories = orderedObjCateg.map(({ type }) => type);
        window.uniqueCatYears = [...new Set(categories)];
        search(orderedObjCateg);
      }
        
        $('.accordion').on('click' ,function(event)
        {
          var target = $(event.target);
          if(target.is('a')){
            var href =  $(event.target).attr('href');
            window.open(href);
          }
        })

        $('#form').submit(function(event)
        {
          event.preventDefault();
          modifyUrl();

          changeState();
        });

        function changeState(){
          modifyUrl();
          setInputValue();
          var selectedFilter = setFilterValue();
          search(definitiveObjectArray);
          if(selectedFilter == 'Year')
          {
            filterByYear();
          } else if(selectedFilter == 'Author')
          {
            search(definitiveObjectArray);
          } else if(selectedFilter == 'Category'){
            filterByCategory();
          } else if(selectedFilter == 'CategoryYear'){
            filterByCatYear();
          }         
        }

        $('select').change(function()
        {
          changeState();
        });

      });

      // Here the Handlebar functions start, they are designated to be used in index.html, not in this file.

      Handlebars.registerHelper('equals', (a,b) => a == b);

      Handlebars.registerHelper('joinToEnd', function(delim, ...args){
        args.pop();
        var args =  
        args.filter(arg => arg !== undefined)
        .join(delim);
        args += '. ';
        return args;
      });

      Handlebars.registerHelper('join', function(delim, ...args){
        args.pop();
        return args
        .filter(arg => arg !== undefined)
        .join(delim);
      })

      Handlebars.registerHelper('link', function(text, url){
        var url = Handlebars.escapeExpression(url),
            text = Handlebars.escapeExpression(text);
        
        return new Handlebars.SafeString("<a href='" + url + "'>" + text + "</a>");
      })

      Handlebars.registerHelper('arrayCompare', function(arg1, arg2){
          if(window[arg2] && arg1 === window[arg2][0]){
            var firstYear = [arg2][0];
            window[arg2].shift();
            return firstYear;
          }
      });
