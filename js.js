var price_lit=0;
var count_days=0;
function Start(){

	count_days=document.getElementById('count_day').value;
	//price_lit=document.getElementById('price_lit_oil').value;
	
	var main_div=document.getElementById('main_div');
	main_div.innerHTML='';
	for(let i=0;i<count_days;++i){
let str="<div id='id_day"+i+"' onclick='show_day("+i+")' class='div_inline_block one_day'>";
str+="<p><label>Топливо:</label><label id='oil_lit"+i+"' >"+0;
str+="</label></p><p><label>Потратил за день:</label><label id='distance"+i+"' >"+0+"</label></p><p><label>В среднем на день до след заправки:";
str+="</label><label id='distance_will"+i+"' >"+0+"</label></p></div>";	
main_div.innerHTML+=str;
	}
}
function GO(){
var last_oil=0;
var last_oil_V=0;
var count_without_oil=0;
var count_without_move=0;
	for(var i=0;i<count_days;++i){
		let oil=document.getElementById('oil_lit'+i);
		console.log(oil.innerHTML);
if(oil.innerHTML>0){
	if(i>0){
count_without_move=count_without_oil+2;
		for(let i2=last_oil;i2<=i;++i2){
			let dis2=document.getElementById('distance'+i2);
if(dis2.innerHTML>0){
	count_without_move--;
last_oil_V-=dis2.innerHTML;
}
else{
let dis_will=document.getElementById('distance_will'+i2);
dis_will.innerHTML=last_oil_V/count_without_move;///count_without_oil
}
		}
	}
	last_oil=i;
	last_oil_V=oil.innerHTML;
	count_without_oil=0;
}
else{
	++count_without_oil;
}
	}
}

function save_day(num){
var oil_c=document.getElementById('oil_lit_current'+num);
var dis_c=document.getElementById('distance_current'+num);
var oil=document.getElementById('oil_lit'+num);
var dis=document.getElementById('distance'+num);

oil.innerHTML=oil_c.value;
dis.innerHTML=dis_c.value;

}

function show_day(num){
var oil=document.getElementById('oil_lit'+num);
var dis=document.getElementById('distance'+num);
var block=document.getElementById('edit_one_day_block_id');
block.innerHTML='';
var str='<p><label >Залил бензин:</label><input id="oil_lit_current'+num+'" type="text" value="'+oil.innerHTML+'"></p>';
str+='<p><label >Потратил за день:</label><input id="distance_current'+num+'" type="text" value="'+dis.innerHTML+'"></p>';
str+="<button class='cur_button' onclick='save_day("+num+")'>Сохранить</button>"
block.innerHTML=str;
}