let lastclicked;
let newtopic;
let topicarray = ['dog', 'cat', 'rabbit', 'hamster' , 'skunk', 'glodgish', 'bird', 'ferret', 'turtle', 'chicken', 'capybara', 'salamander', 'frog', 'hedgehog' ];

function putinittags(){
    for(i = 0; i < topicarray.length; i++){
        let newdiv = $("<div>");
        newdiv.attr('class', 'tag');
        newdiv.text(topicarray[i]);
        $('#tags').append(newdiv);

    }
}
putinittags();

function checktopic(newtopic){
    let arr =  newtopic.split(' ');
    newtopic ='';
    for(j = 0; j < arr.length; j++){
        if( j < (arr.length-1)){
            newtopic += arr[j] + '+';
        } else {
            newtopic += arr[j];
        }
    }
    return  newtopic;
}

//Check if there is the same tag
function checktag(newtopic){
    let index = 0;
    if(newtopic.length > 0){
        for(i = 0; i < topicarray.length - 1; i++){
            if(newtopic == topicarray[i]){
                index++;
            } 
        }
        if(index > 0){
            alert('This topic is alreary exists bro!')
            index = 0;
            return false;
        } else {
            index = 0;
            return true;
        }
    } else {
        alert('Type something bro!');
        return false;
    }
}

$(document).on("click", '.tag', function(){
//clean parent
$('#content').html('');
//getGifs
    let keyword =  $(this).text();
    let gifurl = "http://api.giphy.com/v1/gifs/search?q=" + keyword  + "&api_key=RVGIvOfu1Oz8HbyVVJPkrC7GUJfIVViY&limit=50";

    $.ajax({
        url: gifurl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
       for(i = 0; i < response.data.length; i++){
           let newdiv = $('<div>');
           let newimg = $('<img>');
           let imgsrc = response.data[i].images.fixed_height_still.url;
           let imgdataanimate = response.data[i].images.fixed_height.url;
           let imgdatastill = response.data[i].images.fixed_height_still.url;
           newimg.attr('src' , imgsrc);
           newimg.attr('data-still' , imgdatastill);
           newimg.attr('data-animate' , imgdataanimate);
           newimg.attr('data-state' , 'still');
           newimg.attr('class' , 'dynamicgif');
           newdiv.html($(newimg));
           $('#content').append($(newdiv));
       }
    });
//Highligt clicked tag
    $(lastclicked).attr('id' , 'unclickedtag');
    $(this).attr('id' , 'clickedtag');
    lastclicked = $(this);
    
});
//Add topic
$("#submit").on("click" , function(){
    newtopic = $("#input").val();
    let toshow = newtopic;
    newtopic = checktopic(newtopic);
    if(newtopic.length > 0){
        topicarray.push(newtopic);
    }
    if(checktag(newtopic)){
        let newtag = $('<div>');
        $(newtag).addClass('tag')
        $(newtag).html(toshow);
        $('#tags').append($(newtag));
    } 
});
$(document).on("click", '.dynamicgif', function(){
    let state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

//Clear input
$('#input').on("click", function(){
    $(this).val('');
});


