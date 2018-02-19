$(document).ready(function(){
	var databaseroot = firebase.database().ref("Animes");
	databaseroot.on("child_added" , datasnap => {
	   var Name = datasnap.child("animeName").val();
	   var descriptionstr = datasnap.child("description").val();
	   var imageurl= datasnap.child("imageurl").val();
	   var animeyr = datasnap.child("animeyear").val();
	   var animeepisodenum= datasnap.child("noofepisode").val();
	   //alert("Name "+name+complaintstr);
	   //$("#table-body").append("<tr><td>"+name+"</td><td>"+complaintstr+"</td><td><button>Remove</button></td></tr>");
	             var box= document.createElement("div");
				 //box.style.backgroundImage="https://www.w3schools.com/w3css/img_fjords.jpg"
	             var boxd= document.createElement("div");
				 $(box).addClass("animebox");
				 $(boxd).addClass("animeboxd");
				 var Anime = document.createElement("div");
				//$(Anime).addClass("anime");				
				$(Anime).addClass("col-lg-3 col-md-4 col-sm-5");	
				//Anime.style.backgroundColor="red";
              				
				var pname = document.createElement("p");
				var pyear = document.createElement("p");
				var pepisode = document.createElement("p");				
				var  image= document.createElement("img");
				 $(image).addClass("anime-img");
				 image.src= imageurl;
				   pname.innerHTML = Name;
				   pyear.innerHTML= animeyr;
				   pepisode.innerHTML= animeepisodenum;
				   $(box).append(image);
				   $(box).append(pname);
				   $(box).append(pyear);
				   $(box).append(pepisode);
				   $(box).append(boxd);
				   Anime.style.width= "273px";
				console.log(Anime);
				$(Anime).append(box);
				$("#row-holder").append(Anime);
	  
   });
   console.log("clicked");
	$(".animebox").click(
	function(){
		console.log("clicked");
	}
	);
	var index=0;
	$("#add-btn").click(
	function(){
		 index=index+1;
		 if(index<8){
			 	var day= weekday(index);
		        var row = document.createElement("div");
			    $(row).addClass("row");
				$("#container-holder").append(row);
				
				
		    }
			else{
				
				$(".main").append($('#anime-card'));
			}		
	});
	$("#remove-btn").click(
	function(){
		index--;
		$("li:last").remove();
	});
	function weekday(index){
		switch(index){
			case 1: return "Monday";
			case 2: return "Tuesday";
			case 3: return "Wednesday"
			case 4: return "Thursday"
			case 5: return "Friday"
			case 6: return "Saturday"
			case 7: return "Sunday"
		}
	}
	
});