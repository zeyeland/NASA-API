
var apod = {
    //Create a random date
    randomDate: function(start, end) {
      //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
      var date = new Date(start.getTime() + Math.random() * 
      (end.getTime() - start.getTime()));

      //Format the date
      let d = date.getDate();
      let m = date.getMonth() + 1; //In JS months start at 0
      let y = date.getFullYear();

      //Change the maonth and day strings so that they match the documented format.
      if(m < 10){
        m = '0'+m
      }

      if(d < 10){
        m = '0'+d
      }

      return y + '-' + m + '-' + d;
    },

    buildDOM: function(result){
      $('#apodTitle').text(result.title);

          if(result.media_type === 'video'){
            $("#apodImg").hide();
            $("#apodVideo > iframe").attr('src', result.url).show();
          }else{
            $('#apodVideo').hide();
            $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
          }

         
          $("#apodCopyright").text("Copyright: " + result.copyright);
          $("#apodDate").text("Date: " + result.date);
          $("#apodDesc").text(result.explanation);
    },

    getRequest: function(){
      let date = this.randomDate(new Date(1995, 5, 16), new Date());
      //let date = this.randomDate( new Date(), new Date() );
      var url = "https://api.nasa.gov/planetary/apod?api_key=";
      var nasaKey = "TUnEr2TBPZYgea1CdKbuBxj1lRdBdsRQKoQEGlke";
      var that = this;

      $.ajax({
          url: url + nasaKey + '&date=' + date
      }).done(function(result){
        
        that.buildDOM(result);
        
      }).fail(function(result){
        console.log(result);
      });
    },

    // Application Constructor
    init: function() {
       this.getRequest();
    }
};

apod.init();

$('#randBtn').on('click', function(){
  apod.getRequest();
})
