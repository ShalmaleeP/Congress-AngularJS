
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
//myApp.directive('ui')
myApp.controller('MyController', MyController);

function MyController($scope, $http) {
    
    
    $(document).ready(function(){
        
        var mm=[];
mm["01"]="Jan";
mm["02"]="Feb";
mm["03"]="Mar";
mm["04"]="Apr";
mm["05"]="May";
mm["06"]="Jun";
mm["07"]="Jul";
mm["08"]="Aug";
mm["09"]="Sept";
mm["10"]="Oct";
mm["11"]="Nov";
mm["12"]="Dec"; 
    $('.carousel').carousel({
    interval: false
});    
        
        $http({
    method:'GET',
    url:"allinfo.php",
    params:{ branch:"legislator"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
        var tempres=response.data.results;        
    $scope.legislator=response.data.results;
 
            
            
    //localStorage.setItem("legfavlist","");
    //localStorage.setItem("billfavlist","");
    //localStorage.setItem("commfavlist","");
                    
    $scope.legfunction = function legfunction(leg_id){
    $scope.legres = leg_id;
                 //$scope.dat=leg_id;
    $scope.smonth=mm[leg_id.term_start.substring(5,7)];
    $scope.syear= leg_id.term_start.substring(0,4);
    $scope.sdate=leg_id.term_start.substring(8,10);
    $scope.emonth=mm[leg_id.term_end.substring(5,7)];
    $scope.eyear=leg_id.term_end.substring(0,4);
    $scope.edate=leg_id.term_end.substring(8,10);
        
    $scope.bmonth=mm[leg_id.birthday.substring(5,7)];
    $scope.byear=leg_id.birthday.substring(0,4);
    $scope.bdate=leg_id.birthday.substring(8,10);
    var diff1 = Math.abs(new Date() - new Date(leg_id.term_start.replace(/-/g,'/')));
    var diff2 = Math.abs(new Date(leg_id.term_end.replace(/-/g,'/'))- new Date(leg_id.term_start.replace(/-/g,'/')));
    $scope.dynamic=parseInt(diff1/diff2*100);
    
    $http({
    method:'GET',
    url:"allinfo.php",
    params:{ branch:"legislatorcommittee", id:leg_id.bioguide_id}
    }).then(function successCallback(response){
    
    console.log("success legcommittee");
    console.log(response.data);
    //var tempres=response.data.results;
        $scope.legcom=[]
    $scope.legcommittee=response.data;
        for(i=0;i<5;i++){
            if($scope.legcommittee.results[i]!=null)
                 $scope.legcom.push($scope.legcommittee.results[i]);
        }
        
        
});
    
        
    $http({
    method:'GET',
    url:"allinfo.php",
    params:{ branch:"legislatorbill", id:leg_id.bioguide_id}
    }).then(function successCallback(response){  
    console.log("success legbill");
    console.log(response.data);
    //var tempres=response.data.results;
    $scope.legbill=[]
    $scope.legb=response.data;
        for(i=0;i<5;i++){
            if($scope.legb.results[i]!=null)
                 $scope.legbill.push($scope.legb.results[i]);
        }
        
        
});

}

         
            
});
        
        
$http({
    method:'GET',
        url:"http://openstates.org/api/v1/metadata/?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1",
    //url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    //params:{ branch:"legislator"}
    }).then(function successCallback(response){
    
    console.log("success state");
    console.log(response.data);
    //var tempres=response.data.results;        
    $scope.statelist=response.data;
    var ob={name:"Guam"};
    $scope.statelist.push(ob);
    ob={name:"American Samoa"};
    $scope.statelist.push(ob);
    ob={name:"Puerto Rico"};
    $scope.statelist.push(ob);
    ob={name:"Northern Mariana Islands"};
    $scope.statelist.push(ob);
    ob={name:"US Virgin Islands"};
    $scope.statelist.push(ob);
//    $scope.statelist.push("American Samoa");
//    $scope.statelist.push("Puerto Rico");
//    $scope.statelist.push("Northern Mariana Islands");
//    $scope.statelist.push("US Virgin Islands");
});
    
        
$scope.leghousedata=function leghousedata(){

    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"legislatorhouse"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    var tempres=response.data.results;        
    $scope.leghouse=response.data.results;
});   
}


$scope.legsenatedata=function legsenatedata(){
  
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"legislatorsenate"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    var tempres=response.data.results;        
    $scope.legsenate=response.data.results;
        
        
});   
}

$scope.legdata=function legdata(){
    
     $('.nav-tabs a[href="#viewlegbystate"]').tab('show');
    //$("#")
    //document.getElementById("state").addClass("active");
    $http({
    method:'GET',
       // url:"http://104.198.0.197:8080/"
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"legislator"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    var tempres=response.data.results;        
    $scope.legislator=response.data.results;
});   
}

$scope.legstatedata=function legstatedata(){
    if($scope.selectedItem!="All States"){
        $http({
        method:'GET',
        url:"allinfo.php",
        params:{ branch:"legislatorstate", state:$scope.selectedItem}
        }).then(function successCallback(response){

        console.log("success");
        console.log(response.data);        
        $scope.legislator=response.data.results;
        });   
    }
    else{
        $http({
        method:'GET',
        url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
        params:{ branch:"legislatorstateall"}
        }).then(function successCallback(response){

        console.log("success");
        console.log(response.data);        
        $scope.legislator=response.data.results;
        });   
    }
        
}


$scope.getlegdetails=function getlegdetails(leg_id){
  
    
    console.log("success inside legdetails");      
    $scope.dat=leg_id;
    $scope.smonth=mm[leg_id.term_start.substring(5,7)];
    $scope.syear= leg_id.term_start.substring(0,4);
    $scope.sdate=leg_id.term_start.substring(8,10);
    $scope.emonth=mm[leg_id.term_end.substring(5,7)];
    $scope.eyear=leg_id.term_end.substring(0,4);
    $scope.edate=leg_id.term_end.substring(8,10);
    $scope.bmonth=mm[leg_id.birthday.substring(5,7)];
    $scope.byear=leg_id.birthday.substring(0,4);
    $scope.bdate=leg_id.birthday.substring(8,10);
    var diff1 = Math.abs(new Date() - new Date(leg_id.term_start.replace(/-/g,'/')));
    var diff2 = Math.abs(new Date(leg_id.term_end.replace(/-/g,'/'))- new Date(leg_id.term_start.replace(/-/g,'/')));
    $scope.dynamic=parseInt(diff1/diff2*100);
   
}
        
$scope.toggle_menu=function toggle_menu() {
    
    $("#menu").toggle();
    $("#main_container").toggleClass("col-md-10");
    $("#main_container").toggleClass("col-md-12");
 
} 


$scope.checkleg=function checkleg(leg){
    if(!leg.district)
        return false;
    else
        return true;
}


$scope.changelegcolour=function(legid){
    //$("#"+legid).children[0].style();
//    var x=document.getElementById(legid).children[0];
//    x.style.color="yellow";
    $("#"+legid+"star").css({"color":"yellow"});
}

$scope.activebilldata=function(){
    $('.nav-tabs a[href="#viewactivebills"]').tab('show');
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"billactive"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    $scope.billdata=response.data.results;
});  
}

$scope.newbilldata=function(){
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"billnew"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    $scope.billdata=response.data.results;
});  
}

$scope.getbilldetails=function(bil){
    $scope.billres=bil;
    $scope.imonth=mm[bil.introduced_on.substring(5,7)];
    $scope.iyear= bil.introduced_on.substring(0,4);
    $scope.idate=bil.introduced_on.substring(8,10);
    
}


$scope.commiteehousedata=function(){
    $('.nav-tabs a[href="#viewhousecommmittees"]').tab('show');
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"committeehouse"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    $scope.commdat=response.data.results;
});  
}

$scope.commiteesenatedata=function(){
    
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"committeesenate"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    $scope.commdat=response.data.results;
});  
}

$scope.commiteejointdata=function(){
    $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"committeejoint"}
    }).then(function successCallback(response){
    
    console.log("success");
    console.log(response.data);
    $scope.commdat=response.data.results;
});  
}

$scope.jump=function(){
        $("#favcar").carousel(2);
}

$scope.jumpback=function(){
    $("#favcar").carousel(0);
}

$scope.checkoffice=function checkoffice(it){
    if(!it.office)
        return false;
    else
        return true;
}
$scope.checktwitter=function checktwitter(it){
    if(!it.twitter_id)
        return false;
    else
        return true;
}
$scope.checkfb=function checkfb(it){
    if(!it.facebook_id)
        return false;
    else
        return true;
}

$scope.setlegfav=function(legid){
    var arr=[];
    var leglist;
    //var create="";
    leglist=localStorage.getItem('legfavlist');
    console.log("Before new Item"+leglist);
    if(leglist==""){
        localStorage.setItem("legfavlist",legid);
    }
    else{
        leglist=leglist+" "+legid;
        localStorage.setItem("legfavlist",leglist);    
    }
    legfavidlist=localStorage.getItem("legfavlist");
    console.log("After new Item"+legfavidlist);  
}


$scope.viewlegfav=function viewlegfav(){
    var arr=[];
    var leglist;
    var legfav1=[];
    $scope.lglist=[];
    $('.nav-tabs a[href="#viewfavoritelegislators"]').tab('show');
    
    leglist=localStorage.getItem('legfavlist');
    console.log("Fav List"+leglist);

    if(leglist!="" || leglist!=null){
        var arr1=localStorage.getItem("legfavlist").split(" ");
        for(i=0;i < arr1.length; i++){
        if (arr1[i] != ""){
            
            $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"legfav", id:arr1[i] }
    }).then(function successCallback(response){
    console.log("success");
    console.log(response.data);
    $scope.lg=response.data.results[0];
    $scope.lglist.push(response.data.results[0]);           
});  
            
            }
        }
    
    //$scope.legfav=legfav1; 
    $scope.legfav=$scope.lglist;    
          
    }

}

$scope.deletefavleg= function deletefavleg(legid){
    var arr1=[];
    var updatedlist="";
    console.log("Before Update"+localStorage.getItem("legfavlist"));
    arr1=localStorage.getItem("legfavlist").split(" ");
    if(arr1.length==1){
        updatedlist="";
    }
    else{
         
        if(arr1[arr1.length-1]!=legid){
            for(i=0;i < arr1.length-1; i++){
                if (arr1[i] != legid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }
        else{
            for(i=0;i < arr1.length-2; i++){
                if (arr1[i] != legid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }

    }
    
    localStorage.setItem('legfavlist',updatedlist)
    
     console.log("After Update"+localStorage.getItem("legfavlist"));
    $scope.viewlegfav();  
}


$scope.setbillfav=function(billid){
    var arr=[];
    var billlist;
    billlist=localStorage.getItem('billfavlist');
    console.log("Before new bill Item"+billlist);
    if(billlist==""){
        localStorage.setItem("billfavlist",billid);
    }
    else{
        billlist=billlist+" "+billid;
        localStorage.setItem("billfavlist",billlist);
        
    }
    console.log("After new bill Item"+localStorage.getItem("billfavlist")); 
}


$scope.viewbillfav=function viewbillfav(){
    var arr=[];
    var billlist;
    var billfav1=[];
    $scope.bllist=[];
    billlist=localStorage.getItem('billfavlist');
    console.log("Fav Bill List"+billlist);

    if(billlist!="" || billlist!=null ){
        var arr1=localStorage.getItem("billfavlist").split(" ");
        
        for(i=0;i < arr1.length; i++){
        if (arr1[i] != ""){
                        $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"billfav", id:arr1[i] }
    }).then(function successCallback(response){
    console.log("success");
    console.log(response.data);
    $scope.bllist.push(response.data.results[0]);           
});
            
            
            }
        }
    console.log($scope.bllist);
    $scope.billfav= $scope.bllist; 
       
      
    }
}

$scope.deletefavbill= function deletefavbill(billid){
    var arr1=[];
    var updatedlist="";
    console.log("Before Bill Update"+localStorage.getItem("billfavlist"));
    arr1=localStorage.getItem("billfavlist").split(" ");
    if(arr1.length==1){
        updatedlist="";
    }
    else{
        
        if(arr1[arr1.length-1]!=billid){
            for(i=0;i < arr1.length-1; i++){
                if (arr1[i] != billid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }
        else{
            for(i=0;i < arr1.length-2; i++){
                if (arr1[i] != billid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }
    }
        
    localStorage.setItem('billfavlist',updatedlist)
     console.log("After Bill Update"+localStorage.getItem("billfavlist"));
    $scope.viewbillfav();  
}



$scope.setcommfav=function(commid){
    var arr=[];
    var commlist;
    commlist=localStorage.getItem('commfavlist');
    console.log("Before new bill Item"+commlist);
    if(commlist==""){
        localStorage.setItem("commfavlist",commid);
    }
    else{
        commlist=commlist+" "+commid;
        localStorage.setItem("commfavlist",commlist);
        
    }
    console.log("After new committee Item"+localStorage.getItem("commfavlist")); 
}


$scope.viewcommfav=function viewcommfav(){
    var arr=[];
    var commlist;
    $scope.cmlist=[];
    commlist=localStorage.getItem('commfavlist');
    console.log("Fav Committee List"+commlist);
    var commfav1=[];
        
    if(commlist!="" || commlist!=null){
        var arr1=localStorage.getItem("commfavlist").split(" ");
        for(i=0;i < arr1.length; i++){
        if (arr1[i] != ""){
             $http({
    method:'GET',
    url:"http://webtech.vvnjqmcmaz.us-west-2.elasticbeanstalk.com/allinfo.php",
    params:{ branch:"commfav", id:arr1[i] }
    }).then(function successCallback(response){
    console.log("success");
    console.log(response.data);
    $scope.cmlist.push(response.data.results[0]);           
});
            
            }
        }
    console.log($scope.cmlist);
    $scope.commfav=$scope.cmlist; 
        
    }
}

$scope.deletefavcomm= function deletefavcomm(commid){
    var arr1=[];
    var updatedlist="";
    console.log("Before Committee Update"+localStorage.getItem("commfavlist"));
    arr1=localStorage.getItem("commfavlist").split(" ");
    if(arr1.length==1){
        updatedlist="";
    }
    else{
        
        if(arr1[arr1.length-1]!=commid){
            for(i=0;i < arr1.length-1; i++){
                if (arr1[i] != commid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }
        else{
            for(i=0;i < arr1.length-2; i++){
                if (arr1[i] != commid){
                    updatedlist=updatedlist+arr1[i]+" ";
                }
            }
            updatedlist=updatedlist+arr1[i];
        }
    }


    localStorage.setItem('commfavlist',updatedlist)
     console.log("After Committee Update"+localStorage.getItem("commfavlist"));
    $scope.viewcommfav();  
}




});
}
