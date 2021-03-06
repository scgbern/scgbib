/*
  This is based on a prototype originally written by Alexandru Filipescu
  https://github.com/AlexandruFilipescu/Citation-Search-Engine
*/
$(document).ready(function() {
  var bibItemArray; // the global array of all bib items before filtering

  fetch('scgbib.json')
    .then(response => response.json())
    .then(data => {
      // store a promise for the raw bibtex entries for the citation popups
      window.bibPromise = fetch('scg.bib')
        .then(response => response.text())
        .then(string => string.split(/[\n\r][\n\r]+/g));
      // ready to go
      bibItemArray = data;
      updateState();
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
    var total = `${totalResults.length} ${totalResults.length==1?'entry':'entries'} found`;
    $('#resultsText').text(total);
    $('#resultsText').show('fast');
  }

  /*
    Retrieve the query args, perform the search, and inject the results into the "accordion" element.
  */
  function search(itemArray) {
    const queryString = getUrlParameter('query');
    const queryArray = queryString.split(' ');
    var resultArray = filterItems(queryArray, itemArray);
    showResultCount(resultArray);
    $('#accordion').empty();
    let renderedItem = renderItem({
      items: resultArray
    });
    $('#accordion').append(renderedItem);
    return resultArray;
  }

  /*
    Retrieve the name URL parameter, i.e., 'query' or 'filter', or return a default value.
  */
  function getUrlParameter(type) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(type)) {
      return urlParams.get(type);
    } else {
      return 'Search here...';
      /*
      if (type == 'query') {
        return 'Search here...';
      } else {
        return '';
      }
      */
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
    return urlParams.has(type);
  }

  /*
    Update the URL to reflect the new query and filter values.
  */
  function updateUrl() {
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

  /*
    Set the input value of the search form to the current query string.
  */
  function setQueryInput() {
    var queryString = getUrlParameter('query')
    if (queryString) {
      $('#searchForm').val(queryString);
    }
  }

  /*
    Set the Group-by select element to the retrieved filter value from the URL.
  */
  function setFilterValue() {
    var selectedFilter;
    if (queryKeyExists('filter')) {
      filterValue = getUrlParameter('filter');
      selectedFilter = filterValue;
      $('select').val(filterValue);
    } else {
      selectedFilter = getGroupBySelectorValue();
    }
    return selectedFilter;
  }

  /*
    Comparison function for sorting by a given key (i.e., the 'type' field).
  */
  function compareByKeyValue(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  /*
    Comparison function for group by a given key and sorting by year.
  */
  function compareByKeyValueAndYear(prop) {
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

  /*
    Group results by the publication category (i.e., the 'type' field).
  */
  function groupByCategory(resultArray) {
    var orderedObjCateg = resultArray;
    orderedObjCateg.sort(compareByKeyValue('type'));
    var categories = orderedObjCateg.map(({
      type
    }) => type);
    window.uniqueOrdCateg = [...new Set(categories)];
    search(orderedObjCateg);
  }

  /*
    Group results by the year
  */
  function groupByYear(resultArray) {
    var orderedObjYear = resultArray;
    orderedObjYear.sort((a, b) => b.YEAR - a.YEAR);
    var years = orderedObjYear.map(({
      YEAR
    }) => YEAR);
    window.uniqueOrdYears = [...new Set(years)];
    search(orderedObjYear);
  }

  /*
    Group results by the publication category and year
  */
  function groupByCatYear(resultArray) {
    var orderedObjCateg = resultArray;
    orderedObjCateg.sort(compareByKeyValueAndYear('type'));
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
  });

  $('#form').submit(function(event) {
    event.preventDefault();
    updateState();
  });

  /*
    Update the state of the browser if anything changes.
  */
  function updateState() {
    updateUrl();
    setQueryInput();
    var selectedFilter = setFilterValue();
    var resultArray = search(bibItemArray);
    if (selectedFilter == 'Year') {
      groupByYear(resultArray);
    } else if (selectedFilter == 'Author') {
      search(bibItemArray);
    } else if (selectedFilter == 'Category') {
      groupByCategory(resultArray);
    } else if (selectedFilter == 'CategoryYear') {
      groupByCatYear(resultArray);
    }
  }

  $('select').change(function() {
    updateState();
  });

});

/*
  Here the Handlebar functions start. They are designed to be used in index.html, not in this file.
*/

// Test equality
Handlebars.registerHelper('equals', (a, b) => a == b);

// Compare two arrays
Handlebars.registerHelper('arrayCompare', function(arg1, arg2) {
  if (window[arg2] && arg1 === window[arg2][0]) {
    var firstYear = [arg2][0];
    window[arg2].shift();
    return firstYear;
  }
});

// Join fields
Handlebars.registerHelper('join', function(delim, ...args) {
  args.pop();
  return args
    .filter(arg => arg !== undefined)
    .join(delim);
});

// Join fields and terminate with a period.
Handlebars.registerHelper('joinToEnd', function(delim, ...args) {
  args.pop();
  var args =
    args.filter(arg => arg !== undefined)
    .join(delim);
  args += '. ';
  return args;
});

// Generate a PDF link
Handlebars.registerHelper('pdfLink', function(url) {
  var url = Handlebars.escapeExpression(url);
  // const icon = '<img src="resources/pdf-icon.png" alt="PDF" style="width:18px;height:20px;">';
  const icon = '<img src="resources/page_white_acrobat.png" alt="PDF" style="width:18px;height:20px;">';
  return new Handlebars.SafeString(`<a href='${url}'>${icon}</a>`);
});

// Generate a DOI link
Handlebars.registerHelper('doiLink', function(url) {
  var url = Handlebars.escapeExpression(url);
  const icon = '<img src="resources/doi-logo-pale.png" alt="DOI" style="width:18px;height:20px;">';
  return new Handlebars.SafeString(`<a href='https://doi.org/${url}'>${icon}</a>`);
});

// Return a suitable category heading for each bibtex entry type
Handlebars.registerHelper('categoryName', function categoryName(type) {
  const categoryNames = {
    "article": "Journal articles",
    "book": "Books",
    "booklet": "Booklets",
    "conference": "Conference papers", // NB: legacy bibtex
    "inbook": "Book chapters",
    "incollection": "Papers in collections",
    "inproceedings": "Conference papers",
    "manual": "Technical manual",
    "mastersthesis": "Masters theses",
    "misc": "Miscellaneous",
    "phdthesis": "PhD theses",
    "proceedings": "Conference proceedings",
    "techreport": "Technical reports",
    "unpublished": "Unpublished"
  };
  if (type in categoryNames) {
    return categoryNames[type];
  } else {
    return "Unknown"
  }
});

// Generate a link to popup the bibtex entry for a key
Handlebars.registerHelper('citationLink', function(key) {
  const icon = '<img src="resources/citation-icon.png" alt="PDF" style="padding-left:4px;width:24px;height:20px;">';
  return new Handlebars.SafeString(`<a href="javascript:openBibModal('${key}')">${icon}</a>`);
  // return '';
});

// Open the model box and ask the bibtex promise to add the entry for the given key
function openBibModal(key) {
  var modal = document.getElementById("bibtexModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  fillBibModal(key);
}

// Ask the promise to fill the modal with the bib value for the key
function fillBibModal(key) {
  window.bibPromise.then(entries => {
    var resultArray = entries.filter(entry => entry.includes(key));
    var result;
    if (resultArray.length > 1) {
      console.log(`Whoops! Got ${entries.length} matching entries instead of just one.`)
    }
    if (resultArray.length == 0) {
      result = `Error -- bibtex missing for ${key}`;
      console.log(`Didn't find any entry for ${key}'`);
    } else {
      result = resultArray[0];
    }
    var content = document.getElementById('modalContent');
    content.textContent = (result);
  })
}
