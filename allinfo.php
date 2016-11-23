<?php
header('Access-Control-Allow-Origin:*');

if($_GET['branch']=="legislator"){
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=all";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorhouse"){
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=all&chamber=house";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorsenate"){
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=all&chamber=senate";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorstate"){
    
    $parameters=explode(" ",$_GET['state']);
                    //echo "Parameters:".count($parameters);
                    $newstr="";
                    if(count($parameters)>1):{
                        for($i=0;$i<count($parameters)-1;$i++){
                            $parameters[$i]=strtolower($parameters[$i]);
                            $parameters[$i]=ucfirst($parameters[$i]); 
                            $newstr=$newstr."".$parameters[$i]."%20";
                            
                        }
                    $newstr=$newstr."".ucfirst(strtolower($parameters[$i]));
                        //echo("Statename".$newstr);
                    }
    else: $newstr=$_GET['state'];
    endif;
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=all&state_name=".$newstr;
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorstateall"){
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=all";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorcommittee"){
$url="http://104.198.0.197:8080/committees?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=5&member_ids=".$_GET['id'];
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legislatorbill"){
$url="http://104.198.0.197:8080/bills?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&per_page=5&sponsor_id=".$_GET['id'];
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="billactive"){
$url="http://104.198.0.197:8080/bills?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&last_version.urls.pdf__exists=true&history.active=true&per_page=50";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="billnew"){
$url="http://104.198.0.197:8080/bills?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba1&last_version.urls.pdf__exists=true&history.active=false&per_page=50";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="committeehouse"){
$url="http://104.198.0.197:8080/committees?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&per_page=50&chamber=house";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="committeesenate"){
$url="http://104.198.0.197:8080/committees?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&per_page=50&chamber=senate";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="committeejoint"){
$url="http://104.198.0.197:8080/committees?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&per_page=50&chamber=joint";
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="legfav"){
$url="http://104.198.0.197:8080/legislators?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&bioguide_id=".$_GET['id'];
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="billfav"){
$url="http://104.198.0.197:8080/bills?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&bill_id=".$_GET['id'];
$json=file_get_contents($url);
echo $json;
}
else if($_GET['branch']=="commfav"){
$url="http://104.198.0.197:8080/committees?apikey=2eccdffb3bf4404c8fa4a2eed3b8bba&committee_id=".$_GET['id'];
$json=file_get_contents($url);
echo $json;
}

//echo $_POST['branch'];

?>