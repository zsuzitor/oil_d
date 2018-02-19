//var price_lit=0;
var count_days=0;
var consumption_oil=0;//литров за 1 км
var mass_day=[];
class Day {
constructor(id_){
	this.id=id_;
this.oil=0;
this.spent_oil='';
this.distance='';
this.distance_will='';
this.oil_remainder=0;
}


set_distance(num){
	this.distance=num;
	this.spent_oil=num*consumption_oil;
	console.log(num);
	console.log(consumption_oil);
}

}



function Start(a){
if(count_days==0)
	count_days=document.getElementById('count_day').value;
	//price_lit=document.getElementById('price_lit_oil').value;
	if(consumption_oil==0)
	consumption_oil=document.getElementById('consumption_oil_id').value/100;


	var main_div=document.getElementById('main_div');
	if(!a)
	main_div.innerHTML='';
	var fl=mass_day.length>0?false:true;
	for(let i=0;i<count_days;++i){
		if(fl)
mass_day[i]=new Day(i);
pic_day(mass_day[i]);
//console.log(mass_day[i].distance);

	}
}
function pic_day(day){
var dd=document.getElementById('external_block_day'+day.id);
var str="";

if(dd){
str+="<div id='id_day"+day.id+"' onclick='show_day("+day.id+")'>";
str+="<p><label>Топливо:</label><label id='oil_lit"+day.id+"' >"+day.oil;
str+="</label></p><p><label>Проехал за день:</label><label id='distance"+day.id+"' >"+day.distance+"</label></p><p><label>В среднем на день до след заправки:";
str+="</label><label id='distance_will"+day.id+"' >"+day.distance_will+"</label></p></div>";

dd.innerHTML=str;
}
else{
	var main_div=document.getElementById('main_div');

str+="<div id='id_day"+day.id+"' onclick='show_day("+day.id+")'>";
str+="<p><label>Топливо:</label><label id='oil_lit"+day.id+"' >";
str+="</label></p><p><label>Проехал за день:</label><label id='distance"+day.id+"' ></label></p><p><label>В среднем на день до след заправки:";
str+="</label><label id='distance_will"+day.id+"' ></label></p></div>";


var tmp="<div id='external_block_day"+day.id+"' class='div_inline_block one_day'";
tmp+=str;
tmp+="</div>";
	main_div.innerHTML+=tmp;
}

}
function GO(){
var last_oil_day=-1;
var cur_oil_day=-1;
var oil_remainder=0;



for(let i=0;i<count_days;++i){
if(mass_day[i].oil!=''&&mass_day[i].oil!=0){
if(last_oil_day==-1){
last_oil_day=i;

}
else{
	//if(cur_oil_day==0){
cur_oil_day=i;
//TODO
let dis_o=0;
let ct=0;
for(let i2=last_oil_day;i2<cur_oil_day;++i2){
if(mass_day[i2].spent_oil!==''){
dis_o+=mass_day[i2].spent_oil;

}
else{
	++ct;
}
}
if(ct==0){
var rem_oil=+mass_day[last_oil_day].oil+ +mass_day[last_oil_day].oil_remainder- +dis_o;
mass_day[cur_oil_day].oil_remainder=rem_oil;

}
else{
	var oil_one_day_will= (+mass_day[last_oil_day].oil+ +mass_day[last_oil_day].oil_remainder- +dis_o)/ct;
	for(let i2=last_oil_day+1;i2<cur_oil_day;++i2){
		if(mass_day[i2].distance=='')
mass_day[i2].distance_will=oil_one_day_will/consumption_oil;
	}
}




last_oil_day=cur_oil_day;
cur_oil_day=-1;
	//}
	// else{

	// }
}



}



}

Start(true);












// var last_oil=0;
// var last_oil_V=0;
// var count_without_oil=0;
// var count_without_move=0;
// 	for(var i=0;i<count_days;++i){
// 		let oil=document.getElementById('oil_lit'+i);
// 		console.log(oil.innerHTML);
// if(oil.innerHTML>0){
// 	if(i>0){
// count_without_move=count_without_oil+2;
// 		for(let i2=last_oil;i2<=i;++i2){
// 			let dis2=document.getElementById('distance'+i2);
// if(dis2.innerHTML>0){
// 	count_without_move--;
// last_oil_V-=dis2.innerHTML;
// }
// else{
// let dis_will=document.getElementById('distance_will'+i2);
// dis_will.innerHTML=last_oil_V/count_without_move;///count_without_oil
// }
// 		}
// 	}
// 	last_oil=i;
// 	last_oil_V=oil.innerHTML;
// 	count_without_oil=0;
// }
// else{
// 	++count_without_oil;
// }
// 	}
}

function save_day(num){
var oil_c=document.getElementById('oil_lit_current'+num);
var dis_c=document.getElementById('distance_current'+num);
mass_day[num].oil=oil_c.value;
mass_day[num].set_distance(dis_c.value);
pic_day(mass_day[num]);


}

function show_day(num){

var block=document.getElementById('edit_one_day_block_id');
block.innerHTML='';
var str='<div class="mm_o"><p><label >Залил бензин:</label><input id="oil_lit_current'+num+'" type="text" value="'+mass_day[num].oil+'"></p>';
str+='<p><label >Проехал за день:</label><input id="distance_current'+num+'" type="text" value="'+mass_day[num].distance/consumption_oil+'"></p>';
str+="<button class='cur_button' onclick='save_day("+num+")'>Сохранить</button></div>"
block.innerHTML=str;
}