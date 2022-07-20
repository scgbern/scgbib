/*
  This code was originally written by Alexandru Filipescu as 
  the front-end of the citation search engine.
  https://github.com/AlexandruFilipescu/Citation-Search-Engine
*/
$(document).ready(function() {
  var bibItemArray; // the array of all bib items before filtering
  var globalResultArray; // the array of results after filtering
  var queryString, queryArray; // the raw query string, and the array of tags after splitting
  fetch('./scgbib.json')
    .then(response => response.json())
    .then(data => {
      bibItemArray = data;
      changeState();
    })

  let itemTemplateString = document.getElementById('item-template').innerHTML;
  let renderItem = Handlebars.compile(itemTemplateString);

  /*
    Filter the JSON items returning only those that contain all search tags in some field.
    Make search case insensitive by converting the field value and the tag to lower case.
    (Should be an option?)
  */
  function filterItems(searchTags, itemArray) {
    return itemArray.filter(object =>
      searchTags.every(tag => Object.values(object)
        // .some(value => value.includes(tag))
        .some(value => value.toLowerCase().includes(tag.toLowerCase()))
      ));
  }

  /*
    Inject the count of the results into the "resultsText" element.
  */
  function showResultCount(totalResults) {
    console.log('total results: ' + totalResults.length);
    $('#resultsText').text('Number of results returned: ' + totalResults.length);
    $('#resultsText').show('fast');
  }

  /*
    Retrieve the query args, perform the search, and inject the results into the "accordion" element.
  */
  function search(itemArray) {
    queryString = getQueryString('query');
    queryArray = queryString.split(' ');
    globalResultArray = filterItems(queryArray, itemArray);
    showResultCount(globalResultArray);
    $('#accordion').empty();
    let renderedItem = renderItem({
      items: globalResultArray
    });
    $('#accordion').append(renderedItem);
  }

  /*
    Retrieve the query string from the URL, or return a default search string.
  */
  function getQueryString(type) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(type)) {
      return urlParams.get(type);
    } else {
      return 'Search here...';
    }
  }

  /*
    Retrieve the value of the "group by" select element.
  */
  function getGroupBySelectorValue() {
    var selectedFilter = $('select').children("option:selected").val();
    return selectedFilter;
  }

  /*
    Check if the URL contains the named query field (e.g, 'query', or 'filter.)
  */
  function queryKeyExists(type) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.has(type)
    /* if (urlParams.has(type)) {
      return true;
    } else {
      return false;
    } */
  }

  function modifyUrl() {
    var inputValues = $('#searchForm').val();
    var selectedFilter = getGroupBySelectorValue();
    let params = new URLSearchParams();
    if (inputValues) {
      params.set('query', inputValues);
      params.set('filter', selectedFilter);
      window.history.pushState('', "New page Title", '?' + params.toString());
    } else {
      params.set('query', '');
      console.log('Empty URL values.');
    }
  }

  function setInputValue() {
    var queryValues = getQueryString('query')
    if (queryValues) {
      $('#searchForm').val(queryValues);
    }
  }

  function setFilterValue() {
    var selectedFilter;
    if (queryKeyExists('filter')) {
      filterValue = getQueryString('filter');
      selectedFilter = filterValue;
      $('select').val(filterValue);
    } else {
      selectedFilter = getGroupBySelectorValue();
    }
    return selectedFilter;
  }

  function getSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  function getSortCatOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] === b[prop]) {
        return b['YEAR'] - a['YEAR'];
      }
    }
  }

  function groupByCategory() {
    var orderedObjCateg = globalResultArray;
    orderedObjCateg.sort(getSortOrder('type'));
    var categories = orderedObjCateg.map(({
      type
    }) => type);
    window.uniqueOrdCateg = [...new Set(categories)];
    search(orderedObjCateg);
  }

  function groupByYear() {
    var orderedObjYear = globalResultArray;
    orderedObjYear.sort((a, b) => b.YEAR - a.YEAR);
    var years = orderedObjYear.map(({
      YEAR
    }) => YEAR);
    window.uniqueOrdYears = [...new Set(years)];
    search(orderedObjYear);
  }

  function groupByCatYear() {
    var orderedObjCateg = globalResultArray;
    orderedObjCateg.sort(getSortCatOrder('type'));
    var categories = orderedObjCateg.map(({
      type
    }) => type);
    window.uniqueCatYears = [...new Set(categories)];
    search(orderedObjCateg);
  }
  $('.accordion').on('click', function(event) {
    var target = $(event.target);
    if (target.is('a')) {
      var href = $(event.target).attr('href');
      window.open(href);
    }
  })
  $('#form').submit(function(event) {
    event.preventDefault();
    modifyUrl();
    changeState();
  });

  function changeState() {
    modifyUrl();
    setInputValue();
    var selectedFilter = setFilterValue();
    search(bibItemArray);
    if (selectedFilter == 'Year') {
      groupByYear();
    } else if (selectedFilter == 'Author') {
      search(bibItemArray);
    } else if (selectedFilter == 'Category') {
      groupByCategory();
    } else if (selectedFilter == 'CategoryYear') {
      groupByCatYear();
    }
  }
  $('select').change(function() {
    changeState();
  });
});
// Here the Handlebar functions start, they are designated to be used in index.html, not in this file.
Handlebars.registerHelper('equals', (a, b) => a == b);
Handlebars.registerHelper('joinToEnd', function(delim, ...args) {
  args.pop();
  var args =
    args.filter(arg => arg !== undefined)
    .join(delim);
  args += '. ';
  return args;
});
Handlebars.registerHelper('join', function(delim, ...args) {
  args.pop();
  return args
    .filter(arg => arg !== undefined)
    .join(delim);
})
Handlebars.registerHelper('link', function(text, url) {
  var url = Handlebars.escapeExpression(url),
    text = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString("<a href='" + url + "'>" + text + "</a>");
})
Handlebars.registerHelper('arrayCompare', function(arg1, arg2) {
  if (window[arg2] && arg1 === window[arg2][0]) {
    var firstYear = [arg2][0];
    window[arg2].shift();
    return firstYear;
  }
});