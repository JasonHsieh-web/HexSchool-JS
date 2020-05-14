


var xhr = new XMLHttpRequest;

xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);

xhr.send(null);
var ZoneHead =document.querySelector('.Zn');
var AddSpot =document.querySelector('.spot');

var select = document.querySelector('.sel');

var hot1 =document.querySelector('.hot1');
var hot2 =document.querySelector('.hot2');
var hot3 =document.querySelector('.hot3');
var hot4 =document.querySelector('.hot4');



xhr.onload = function(){
    //轉為陣列格式
    var data =JSON.parse(xhr.responseText);
        //console.log(data.result.records);
    var spot =data.result.records;
    //console.log(spot);
    var dataLong =spot.length;
        

    var areaList =[];
    for(var i=0;dataLong>i;i++){
    areaList.push(spot[i].Zone);
  }
    //  console.log(areaList);
    var area =[];
    areaList.forEach(function(value) {
      //console.log(value); 就是areaList的值也就是各個地區
      if (area.indexOf(value) == -1) {//indexof(value)表示要在area[0]開始找尋有沒有該地區的值如果沒有就回傳-1
          area.push(value);  //接到-1後就把值push進去
      }
    });
    
    //console.log(area);
      var str='';
     for(let a=0;a<area.length;a++){
     
      str+=`<option value="${area[a]}">${area[a]}</option>`;

      select.innerHTML = str;

      var firstOption = document.createElement('option');
      firstOption.textContent = '--請選擇行政區--';
      firstOption.setAttribute('value','請選擇行政區');
      firstOption.setAttribute('class','selOpt');
      firstOption.setAttribute('selected','selected'); //預設為首個選項
      select.appendChild(firstOption);//增加這個option但會到最後面
      var firstOptionOld = document.getElementsByTagName("option")[0]; //把第一個option"三民區"指定給firstOptionOld
      //console.log(firstOptionOld);
      select.insertBefore(firstOption,firstOptionOld); //把選擇行政去插入在三民區之前
     }


     select.addEventListener('change',updateList,false); //綁定監聽change事件
    
      //目的:要跑出該地區全部的資訊
      function updateList(e){
        var UserZone =e.target.value;
        //console.log(UserZone);

        var ZoneStr ='';
         for(let j=0;j<dataLong;j++){

            if(spot[j].Ticketinfo==''){
              spot[j].Ticketinfo='沒有資訊';
            }

         if(UserZone === spot[j].Zone){

          ZoneHead.textContent =spot[j].Zone;
            
           ZoneStr+=`<div class="singleSpot">
                     <div class="spot-pic" style=" background-image: url(${spot[j].Picture1}); ">
                     
                          <div class="spot-txt">
                          <div class="spot-name">${spot[j].Name}</div>
                          <div class="spot-zone">${spot[j].Zone}</div>
                          </div>
                     </div>

                     <div class="Info">
                          <ul class="Info-List">
                                <li class"openTime"><img src="pic/icons_clock.png" alt="">${spot[j].Opentime}</li>
                                <li class"Address"><img src="pic/icons_pin.png" alt="">${spot[j].Add}</li>
                                <li class"Number"><img src="pic/icons_phone.png" alt="">${spot[j].Tel}</li>
                                <li class"free"><img src="pic/icons_tag.png" alt="">${spot[j].Ticketinfo}</li>
                          </ul>
                     </div>
           </div>`
           AddSpot.innerHTML = ZoneStr;
         }else if(UserZone=== '請選擇行政區'){
          ZoneHead.textContent ='';
          
           AddSpot.innerHTML = '';
         }

      }
             
      }

      hot1.addEventListener('click',ClickSpot,false);//綁定監聽
      hot2.addEventListener('click',ClickSpot,false);
      hot3.addEventListener('click',ClickSpot,false);
      hot4.addEventListener('click',ClickSpot,false);



      function ClickSpot(k){

        var btnValue = k.target.textContent;
        // console.log(btnValue);
        var ClickStr ='';

        for(let b=0;b<dataLong;b++){
          if(spot[b].Ticketinfo==''){
            spot[b].Ticketinfo='沒有資訊';
          }

       if(btnValue === spot[b].Zone){

        ZoneHead.textContent =spot[b].Zone;
          
        ClickStr+=`<div class="singleSpot">
                   <div class="spot-pic" style=" background-image: url(${spot[b].Picture1}); ">
                   
                        <div class="spot-txt">
                        <div class="spot-name">${spot[b].Name}</div>
                        <div class="spot-zone">${spot[b].Zone}</div>
                        </div>
                   </div>

                   <div class="Info">
                        <ul class="Info-List">
                              <li class"openTime"><img src="pic/icons_clock.png" alt="">${spot[b].Opentime}</li>
                              <li class"Address"><img src="pic/icons_pin.png" alt="">${spot[b].Add}</li>
                              <li class"Number"><img src="pic/icons_phone.png" alt="">${spot[b].Tel}</li>
                              <li class"free"><img src="pic/icons_tag.png" alt="">${spot[b].Ticketinfo}</li>
                        </ul>
                   </div>
         </div>`
         AddSpot.innerHTML = ClickStr;
        }


      }

}


}
