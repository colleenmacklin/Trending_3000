var ds,
    generated = false;
var trendingURL = "https://docs.google.com/spreadsheets/d/14px-OfS4q7R9m_AV3NK6KHGem8IfTHx12vlu0II-B6Y/edit#gid=0"
var numTopics = 0;
var colorNum = 0;
  var bkgd = ['FF9300', 'EF5FA7', 'B9BD28', 'EEBD40', '68FFCC', 'FFBBF3', 'A98435', 'FF0000', '1200FF', '009746', 'FFEC00', '6E01D1']; //Set your colors here
  var letters = ['93D412', 'FEFB53', 'FF67F9', '8C00FD', 'F19FF9', 'B49D32', '74F959', '00E6E4', 'F3FF17', 'F6C1D8', 'E4007E', 'DAFF17']; //Set your colors here
  var typeColor = ['1A2F64', '1A2F64', '1A2F64', '1A2F64', '1A2F64', '1A2F64', '1A2F64', '1A2F64', 'FFFFFF', '1A2F64', '1A2F64', 'FFFFFF']; //Set your colors here

//var key = '14px-OfS4q7R9m_AV3NK6KHGem8IfTHx12vlu0II-B6Y';
//function parseUrl(url) {
  function parseUrl(url) {

  if (url.match(/\/d\/(.*)\//)) {
    return url.match(/\/d\/(.*)\//)[1];
  }
    
  if (url.match(/key=(.*)#/)) {
    return url.match(/key=(.*)#/)[1];
  }

  else return null;
}

var pick = function(array) {
  array = _.reject(array, function(el) {
    return el === null;
  });
  return array[Math.floor(Math.random()*array.length)];
};

function doIt(key) {
    console.log(key);

      var $genButton = $('<div id="generator" style="text-align: center;"><p><h1 id="generated">...</h1></p></div>');
  

  ds = new Miso.Dataset({
    key : key,
    worksheet : '1',
    importer: Miso.Dataset.Importers.GoogleSpreadsheet,
    parser : Miso.Dataset.Parsers.GoogleSpreadsheet
  });

  ds.fetch({
    success : function() {
      if (generated) {
        $('#generator').remove();
      }
      //$('#result').text('Success! Now you can generate stuff:');
      $('#result').after($genButton);
      generated = true;
      generate();
    },
    error : function() {
      $('#result').text('Um, something went wrong...');
    }
  });
}

function generate() {
  var result = '';
  var title = 'Trending Topics';
  var author = 'Colleen Macklin';
  var numTopics = 0;
  var stringLength = 0; //maybe I can pass the length, and then resize the text?

  //var num = 0;
  ds.eachColumn(function(columnName, column, index) {
    a = column.data;
    var uniq = _.uniq(a);
    //var numTopics = count(a);
    
    numTopics = a.length;

    console.log(numTopics);
        // if it's a title, do special stuff
      result += pick(column.data) + ' ';

    //stringLength = result.length;
    //console.log("stringLength " + stringLength);
  });
  $('#generated').text(result);

  if (colorNum < bkgd.length-1){
    colorNum++;
  } else colorNum = 0;

  change_col(colorNum);
  //$('#author').text('by ' + author);
}

function change_col(indexNum){
  var color = '#'; // hexadecimal starting symbol
  var colorText = '#';
  var plainText = '#';
  var indexNum;
                

  indexNum = Math.floor(Math.random() * bkgd.length);
  color += bkgd[indexNum];
  colorText += letters[indexNum]; //change to = color index
  plainText += typeColor[indexNum]; //change to = color index

  /*index = index+1;
  colorText += letters[index];*/
  /*document.getElementById('container').style.background = color; // Setting the random color on your div element.*/
  document.body.style.background = color;

  var h1Elements = document.getElementsByTagName("h1");
  var h2Elements = document.getElementsByTagName("h2");
  var h3Elements = document.getElementsByTagName("h3");
  var bodyElements = document.getElementsByTagName("body");
  var buttonElements = document.getElementsByTagName("button");
  var aElements = document.getElementsByTagName("a");


  for(var i = 0; i < h1Elements.length; i++) {
      h1Elements[i].style.color = colorText;
  }

  for(var i = 0; i < h2Elements.length; i++) {
       h2Elements[i].style.color = colorText;
  }

  for(var i = 0; i < h3Elements.length; i++) {
       h3Elements[i].style.color = colorText;
  }

  for(var i = 0; i < bodyElements.length; i++) {
      bodyElements[i].style.color = plainText;
  }

    for(var i = 0; i < buttonElements.length; i++) {
      buttonElements[i].style.backgroundColor = colorText;
      buttonElements[i].style.color = "#1A2F64";
      buttonElements[i].borderColor = "#1A2F64";
  }
    for(var i = 0; i < aElements.length; i++) {
      aElements[i].style.color = colorText;
  }


}
$('button.cooldown').click(function(){
  var btn = $(this);
  btn.prop('disabled', true);
  setTimeout(function(){
    btn.prop('disabled', false);
  },60000);
});

function showHelp() {
  $('#help').fadeToggle();
}

function howmanyTopics(){
  console.log("how many?" + numTopics);
    $('#numTopics').text(numTopics);
}