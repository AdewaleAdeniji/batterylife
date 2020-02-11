//console.log("started");
loadstate();
function loadstate(e){
    var demo = localStorage.getItem("demo");
if(demo){
   // alert(demo);
   //console.log(demo);
   hide('demo-mode');
   hide('mylinks');
   show('batterybtn');
   show('navbarme');
   show("opened");
   hide('chargeinfo');
   //$('#gamesection').hide();
   show('home');
swal.fire({
text:'Loading',
footer:'<i class="fa fa-spinner fa-spin"></i>',
allowOutsideClick:false,
showCloseButton:false,
showCancelButton:false,
allowEscapeKey:false,
showConfirmButton:false,
timer:4000,
});
   start();
}
else {
    //console.log("new user");
    show('demo-mode');
     show('mylinks');
     hide('batterybtn');
     hide("navbarme");
     hide('opened');
}

}
//show('demo-mode') ;
    $('.homebtn').click(()=>{
        show('home');
        hide('chargeinfo');
       // hide('gamesection');
    })
    $('.chargebtn').click(()=>{
        hide('home');
        show('chargeinfo');
        //hide('gamesection');
    })
    // $(".gamesbtn").click(function(){
    //     hide('home');
    //     hide('chargeinfo');
    //     show('gamesection');
    // });
    $('.getstarted').click(()=>{
        var os = ['windows','linux','ubuntu','mac','iphone','ipad','android'];
        var user = ((navigator.userAgent).toLowerCase()).toString();
        //console.log(user);
        var found=10;
        var seen = false;
        var indfound;
        os.forEach((item,index)=>{
           // console.log(item);
            let find = user.search(item); 
           // console.log(find);  
            if(find>0){
                found = index;
                seen = true;
                indfound = find;
               // console.log(item,found);
            }
        });
        if(seen){
            var phone = os[found];
            
            if(found==6){
                //var androids = ['tecno','infinix','itel','nokia','pixel'];
                
                var avs = user.substr(indfound,13);
                phone = avs;
              //  console.log(phone,avs);
            }
            swal.fire({
                icon:'question',
                text:'Can we meet you,What\'s your name',
                input:'text',
                inputAttributes:{
                    required:true,
                    validationMessage:'Enter a correct name',  
                },
                validationMessage:'Enter a correct name', 
                backdrop: `
                rgba(0,0,123,0.4)`,

                allowOutsideClick:true,
                showCancelButton:false,
                showCloseButton:true,
                confirmButtonText:'Let\'s go <i class="fa fa-smile-wink"></i>',
            })
            .then((data)=>{
                if(data.value){
                    var name = (data.value).trim();
                    if(name==""){
                        swal.fire({
                            icon:'warning',
                            text:'Invalid username,Try again',
                            footer:'<i class="fa fa-smile-wink"></i>',
                        }) 
                    }
                    else {
                        swal.fire({
                            text:'Hi '+name+',It seems you are using '+phone,
                            confirmButtonText:'Yes ',
                            allowOutsideClick:false,
                            showCancelButton:false,
                            showCloseButton:false,

                        })
                        .then((result)=>{
                            if(result){
                                setitem('demo',true);
                                loadstate();
                                start();
                                setitem('user',name);
                                
                            }
                        })

                    }
                }
                else {
                    swal.fire({
                        icon:'warning',
                        text:'Invalid username,Try again',
                        footer:'<i class="fa fa-smile-wink"></i>',
                    })
                }
            })
        }
        else {
            swal.fire({
                type:'warning',
                text:'Error Occured while processing your request::Reason-Your Browser is not supported',
                footer:'<i class="fa fa-spinner fa-spin"></i>',
            })
            window.location.reload();
        }
       // console.log(found);
    });
    st();
    function st(){
        var a = getitem('charges');
        var b = getitem('percentcharged');
        var uptime = getitem('uptime');
        var sectook = getitem('sectook');
        var chargedur = getitem('chargedur');

        if(chargedur==undefined||chargedur==null||chargedur==''){
            
        
            setitem('chargedur',0);
        }
        if(sectook==undefined||sectook==null||sectook==''){
            
        
            setitem('sectook',0);
        }
        if(b==undefined||b==null||b==''){
            
        
            setitem('percentcharged',0);
        }
        if(uptime==undefined||uptime==null||uptime==''){
            
        
            setitem('uptime',0);
        }
        if(a==undefined||a==null||a==''){
            
        
            setitem('charges',0);
        }
        var o = getitem('charges');
        var sct = getitem('sectook');
        if(sct==0){
            get('sectook').innerHTML="Not Yet calculated";

        }
        else {
            get('sectook').innerHTML=sct+" seconds";
        }
        get('chargetime').innerHTML=o+' times';
       // console.log('called');
              
    }
    window.setInterval(()=>{
        

                var upt = parseInt(getitem('uptime'));
               // console.log("coming"+upt);
                var b = upt+1;
                //console.log("saving"+b);
                setitem('uptime',b);
               var str = conv(upt);
               get('uptime').innerHTML=str;
               
            },1000);
   
    function conv(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
function setitem(e,a){
    localStorage.setItem(e,a);
}
function getitem(e){
    return localStorage.getItem(e);
}
function show(e){
    get(e).style.display="block";
}
function hide(e){
    get(e).style.display="none";
}

function get(e){
    return document.getElementById(e);
}
var timebefore = 0;
var timenow = 0;
var lod = false;
var prevlevel =  0;
var time = 0;
var nrlevel = 0 ;
var ptime = 0;
var ctime = 0;
var pluggedtime = 0;
var changed = false;
var chargingstate = false;
window.setInterval(()=>{
    time = time + 1;
    start();
    //console.log(time);
},1000);

function start(){
try{
if(navigator){
  
   // console.log("okay");
   // if(reup){

   //  timebefore = time;
   // }
    navigator.getBattery()
    .then((battery)=>{
        
        var level = parseInt(battery.level*100); 
        
        get('batlevel').innerHTML=level+'%';
        get('batterybar').style.width=level+'%';
        get('batterybar').innerHTML=level+'%';
        //console.log()
        if(lod==false){
         swal.fire({
             text:'You have '+level+'% battery level left',
             confirmButtonText:'Okay',
            onOpen:(()=>{
                lod=true;
            }),
         }).then((result)=>{
                
                    lod = true;
                    play('charging');
                    pause('charging');

         });
     }
        var charging = battery.charging;
        chargingstate = charging;
        if(level==100){
                chargingstate=false;
                charging=false;
            }

        prevlevel = level;
        var sectook = getitem('sectook');
        if(st==0){
            get('sectook').innerHTML="Not Yet calculated";

        }
        else {
            get('sectook').innerHTML=sectook+" seconds";
        }
        var dur = getitem('chargedur');
        if(st==0){
            get('chargedur').innerHTML=0;

        }
        else {
            get('chargedur').innerHTML=conv(dur);
        }
        var lastc = getitem('lastcharge');
        get('lastcharge').innerHTML=lastc;
        if(chargingstate){
            
            $(".che").show();
            var stats = getitem('stats');
                 var today = new Date(); 
       // el_up.innerHTML = today; 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
        var hours = today.getHours();
        var min = today.getMinutes();
        var yyyy = today.getFullYear(); 
        var sec = today.getSeconds();
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        if (min < 10) { 
            min = '0' + min; 
        } 
        var datesplug =  hours+":"+min+ " |  "+dd +"/" +mm+"/"+yyyy;
        if(!changed){
            pluggedtime =datesplug;
            changed = true;
        }
            // if(stats==''){
            //     var arrs = [];
            // }
            // else {
            //     var arrs = stats.split(",");
            // }
            // var dt = arrs[0];
            // if(dt!=dd){
            //     var n = [dd,''];
            //     setitem('stats',n);
            // }
            // var nowt = JSON.stringify({date:hours+':'+min});
            chargingwork();
            get('batterybar').innerHTML=level+'%'+'&nbsp;charging';
            get('batterybar').className="batterybaro";
            get('batlevel').innerHTML=level+'%';
            get('batterybtn').style.animationName="anim";
            get('batterybtn').style.animationDuration="1s";
            get('batterybtn').style.animationIterationCount="infinite";
            get('batterybtn').style.color="#fff";
       
        var today = hours+':'+min+': '+sec+' '+ dd + '/' + mm + '/' + yyyy;
            //get('batterybtn').style.border="3px solid #fff";
            get('lastcharge').innerHTML=today;
            setitem('lastcharge',today);
        }
        else {
            $(".che").hide();
            get('batterybtn').style.color="#563d7c";
            get('batterybtn').style.border="1px solid #563d7c";

            get('batterybtn').style.animationName="";
            get('batterybar').className="batstr";
         var today = new Date(); 
       // el_up.innerHTML = today; 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
        var hours = today.getHours();
        var min = today.getMinutes();
        var yyyy = today.getFullYear(); 
        var sec = today.getSeconds();
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        if (min < 10) { 
            min = '0' + min; 
        } 
        if(pluggedtime!=0){
         var unpluggedtime = hours+":"+min+ " | "+dd +"/" +mm+"/"+yyyy ;
            var stats = getitem('stats');
        //     if(stats==0){
        //         var arrs = [];
        //     }
        //     else {
        //     var arrs = stats.spit(',');
        // }
            // var obj = JSON.stringify({plugged:pluggedtime,unplug:unpluggedtime});
            // console.log(obj);
            // arrs.push(obj);
            // console.log(arrs);
            // setitem('stats',arrs.join(','))
            var obj = pluggedtime+"*"+unpluggedtime;
            var ns = stats+","+obj;
            setitem('stats',ns);
            console.log(ns);
            pluggedtime = 0;
            changed = false;
            loadwork();
        }
        }
         var ui = parseInt(getitem('percentcharged'));
        get('charges').innerHTML=ui+'%';
        battery.onlevelchange=(e)=>{
            loadstats();
            //perform operations based on level change
         //   console.log(level,e.target.level*100);

            level=e.target.level*100;
            say("Your new battery level is "+ parseInt(level) +' percent');
            if(prevlevel<level){
            navigator.vibrate(500);
            ctime = time;
            var cta = Math.abs(ctime-ptime);

            setitem('sectook',cta);
            manipul(cta);
            get('sectook').innerHTML=cta+' seconds or'+ conv(sectook);
            var op = level-prevlevel;
            var it = parseInt(getitem('percentcharged'));
            var j = it+op;
           // console.log(ct,o);
            var pplugged = getitem('pplugged');
            var nl = Math.abs(pplugged-level);
            get('pcharged').innerHTML=nl+'%';
            setitem('percentcharged',j);
            }
             ptime = time;
            //console.log(time);
            start();
            play('percent');
             window.setTimeout(()=>{
                   pause('percent');
               },3000);
             monitor(level);
        }
        battery.onchargingchange=(e)=>{
            //perform new operations based on discharging or charging states
           
           

            if(e.target.charging){
                     var today = new Date(); 
       // el_up.innerHTML = today; 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
        var hours = today.getHours();
        var min = today.getMinutes();
        var yyyy = today.getFullYear(); 
        var sec = today.getSeconds();
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        var datesplug =  hours+":"+min+ " | "+dd +"/" +mm+"/"+yyyy ;
        if(!changed){
            pluggedtime =datesplug;
            changed = true;
        }
            //     console.log(charging,e.target.charging);
            var ct = parseInt(getitem('charges'));
            var o = ct+1;
         //   console.log(ct,o);
            get('chargetime').innerHTML=o+' times';
            setitem('charges',o);
                //chargingwork();

              // play('charging');
               swal.fire({
                   text:'Charging at '+level+'%',
                   footer:'<i class="fa fa-battery"></i>',
               })
               .then((result)=>{
                pause('charging');
               });
               window.setTimeout(()=>{
                   pause('charging');
               },10000);

            }
            else {
                swal.fire({
                   text:'Charger Disconnected at '+level+'%',
                   footer:'<i class="fa fa-battery"></i>',
                   timer:3000,
                   timerProgressBar:true,
               })
                setitem('unplug',level);
                get('unplugged').innerHTML=' Percent UnPlugged : '+level+'%';
                pause('charging');
            }
            cdurt=0;
            start();
        }
        
    })
    .catch((err)=>{
       // console.log(err);
    });
    loadstats();

}
else {
   // console.log("browser outdated");
}
}
catch(err){
    console.log(err);
}
}
pause("charging");
pause("percent");

// get('batterybtn').click();
function play(e){
    var soun = getitem('sounds');
    if(soun=="true"||soun==''){
    get(e).play();
    }
    
}
function say(e){
   
    
       
    var a = new SpeechSynthesisUtterance(e);
    var s = window.speechSynthesis;
   // var voices = s.getVoices();
    //console.log(a.voice);
   // a.voice = voices[1];
    s.speak(a);
    
}
function pause(e){
    get(e).pause();
}
 var renderplug = false;
function rerender(){
    if(renderplug){
    var plevel = getitem('ppluged');
    get('plugged').innerHTML='Percentage Plugged : '+plevel+'%';
    renderplug=false;
}   
    if(chargingstate==false){
     var ulevel = getitem('unplug');
    get('unplugged').innerHTML='Percentage Unplugged : '+ulevel+'%';
    }

}
var cdurt = 0;
window.setInterval(()=>{
    if(chargingstate){
        cdurt++;
        document.getElementById("durt").innerHTML=' Duration Taken : '+ conv(cdurt);
        get('plugdur').innerHTML=conv(cdurt);
    }
},1000);
function manipul(e){
    window.setInterval(()=>{
    if(chargingstate&&e>0){
        e--;
        document.getElementById("tonext").innerHTML=conv(e);
       // get('plugdur').innerHTML=conv(cdurt);
    }
},1000);
}
function chargingwork(){
   // get('topic')

   try{
       if(chargingstate){
        var plevel = prevlevel;
        var nlevel = plevel+1;
        
        document.getElementById('ctd').innerHTML=' Countdown to ' +nlevel+'%';
        setitem('ppluged',plevel);
         var plevel = getitem('ppluged');
        get('plugged').innerHTML='Percentage Plugged : '+plevel+'%';
   }
   else {
       var plevel = prevlevel;
        setitem('unplug',plevel);
   }
 
}
catch(err){
    console.log(err);
}

}
//console.log(localStorage.chargedur);
startup();
function startup(){
    progres('cdur');
     progres('ppluged');
     progres('unplug');
     progres('sounds');
    // progres('stats');
     var e = getitem("percents");
    if(e==null||e==undefined||e==''){ 
     var arr = [];

     var l = 100;
     for(i=0;i<l;i++){
         arr.push('0');
     }
     //console.log(arr);
     setitem('percents',arr);
 }
    var y = getitem("dstats");
    if(y==null||y==undefined||y==''){ 
     var ar = [];
   
     var l = 100;
     for(i=0;i<l;i++){
         ar.push('');
     }
     //console.log(arr);
     setitem('dstats',ar);
 }
    //progres(cdur);
}

function progres(d){
    var e = getitem(d);
    if(e==null||e==undefined||e==''){
    setitem(d,0);
    }

}
window.setInterval(()=>{
    pause('charging');
    pause('percent');
},14000)
window.setInterval(()=>{
                if(chargingstate){
                var cty = parseInt(getitem('chargedur'));
                var ty = cty+1;
                var kl = conv(ty);
                get('chargedur').innerHTML=kl;
                setitem('chargedur',ty);
                
                }

            },1000);
function monitor(level){
    var plevel = prevlevel;
    //var level = nrlevel;
    var c = (level-plevel).toString();
   // console.log(plevel,level,c);
   if(c=="0"){

   }
   else {
    var stats = (getitem('dstats')).split(",");
    var minus = c.indexOf('-');
    var stat = stats[plevel];
    if(stat==''){
        var n = ":";
    }
    else {
        var n = stat;
    }
   // console.log(n);
    var f = n.split(":");
   // console.log(f);
    var dec = f[1];
    var inc = f[0];
     var timet = ptime;
   // console.log(minus);
    if(minus===-1){
       f[0] = timet;
       f[1] = '';
       let narr = f.join(":");
      // console.log(narr);
        stats[level] = narr;
        let g = stats.join(",");
        setitem('dstats',g);
     //  console.log("increased");

    }
    else {
        f[1] = timet;
       f[0] = '';
       let narr = f.join(":");
     //  console.log(narr);
        stats[level] = narr;
        let g = stats.join(",");
        setitem('dstats',g);
          //  console.log("decreased");
    }
}
   //   console.log(ptime,ctime);
   // console.log(plevel,level,c); 
}
loadwork();

function loadwork(){
    get('tbodyapp').innerHTML='';
    var data = getitem('stats');
    var arr = data.split(",");
    arr.forEach((item,index)=>{
        if(item==''||item==null||item==undefined){

        }
        else {
        var a = item.split('*');
        var obj = `<tr>
                       <td>${a[0]}</td>
                        <td>${a[1]}</td>
                                      
                  </tr>`;

                $('#tbodyapp').append(obj);
            }
    })
    
}
loadstats();
function loadstats(){
     get('tbodyapp2').innerHTML='';
    var data = getitem('dstats');
    var arr = data.split(",");
    arr.forEach((item,index)=>{
        if(item==''||item==null||item==undefined){

        }
        else {
        var a = item.split(':');
        var ch = a[0]
        if(ch==''){
            ch = '';
        }
        else {
            ch = ch+' seconds';
        }
        var che = a[1]
        if(che==''){
            che = '';
        }
        else {
            che = che+' seconds';
        }
        var obj = `<tr>
                        <td>${index}%</td>
                       <td>${ch} </td>
                        <td> ${che} </td>
                                      
                  </tr>`;

                $('#tbodyapp2').append(obj);
            }
    })
}
    
$(".settingsbtn").click(function(){
    var sounds = getitem('sounds');
    if(sounds=="true"){
        swal.fire({
            icon:'question',
            text:'Do you want to deactivate sounds ?',
            confirmButtonText:'Yes',
            showCancelButton:true,
            cancelButtonText:'No',
            confirmButtonColor:'#563d7c',
            allowOutsideClick:false,
            allowEscapeKey:false,
            showCloseButton:false,
            backdrop:'#563d7c',
        })
        .then((res)=>{
            if(res.value){
                //console.log("deactivate");
                setitem('sounds',false);

            }
            else {
                
               // console.log("canceled");
            }
            moveon();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    else{
        swal.fire({
            icon:'question',
            text:'Do you want to Activate sounds ?',
            confirmButtonText:'Yes',
            showCancelButton:true,
            cancelButtonText:'No',
            confirmButtonColor:'#563d7c',
            allowOutsideClick:false,
            allowEscapeKey:false,
            showCloseButton:false,
            backdrop:'#563d7c',
        })
        .then((res)=>{
            if(res.value){
                setitem('sounds',true);
              //  console.log("activate");
            }
            else {
               // console.log("canceled");
            }
            moveon();
        })
        .catch((err)=>{
            console.log(err);
        });
    }   
});
const moveon = (()=>{
    swal.fire({
        icon:'success',
        text:'Clear all logs',
        confirmButtonText:'Clear <i class="fa fa-trash"></i>',
        confirmButtonColor:'#563d7c',
        backdrop:'#563d7c',
        cancelButtonText:'No',
        allowOutsideClick:false,
            allowEscapeKey:false,
            showCloseButton:false,
    })
    .then((result)=>{
        if(result.value){
            setitem('stats','');
            setitem('dstats','');
            setItem('percents','');
        }


    swal.fire({
            icon:'success',
            html:'This Web App was developed by <a href="https://bit.ly/feranmidev" target="_blank">DevFeranmi (Twitter: <a href="https://twitter.com/devferanmi" target="_blank">@DevFeranmi</a> </i>',
            showConfirmButton:false,
            timer:10000,

    })
    })
});
