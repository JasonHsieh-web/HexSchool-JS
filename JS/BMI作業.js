var list = document.querySelector('.list');
var btn = document.querySelector('.origin');



var data = JSON.parse(localStorage.getItem('listData')) || [];

var h = document.querySelector('.hight');
var w = document.querySelector('.weight');



btn.addEventListener('click',CalBmi,false);
list.addEventListener('click',deData,false);


//計算BMI
function CalBmi(e){
    var hv = parseInt(document.querySelector('.hight').value);
    var wv = parseInt(document.querySelector('.weight').value);

    var bmi =(wv/(hv*hv))*10000;
    bmi =bmi.toFixed(2); //取小數點後兩位

    var status ='';
    var color ='';

    if(bmi<18.5)
    {
        status='過輕';
        color='blue';
    }else if(bmi>=18.5 && bmi<24){
        status='理想';
        color='green';
    }else if(bmi>=24 && bmi<27){
        status='過重';
        color='orange';
    }else if(bmi>=27 && bmi<30){
        status='輕度肥胖';
        color='juicy';
    }else if(bmi>=30 && bmi<35){
        status='中度肥胖';
        color='juicy';
    }
    else if(bmi>=35){
        status='嚴重肥胖';
        color='red';
    }
    
    if(isNaN(hv)||isNaN(wv)){
        alert('請輸入數字');
        return false;
    }

    var txt ={//建立物件
        status:status,
        BMI:bmi ,
        weight:wv,
        height:hv,
        color:color
    }


    data.push(txt);//傳入資料

    localStorage.setItem('listData',JSON.stringify(data));//設置item並把資料轉為字串
        updateWeb(data);//更新網頁內容

        changeBtn(data);//更改按鈕樣式
       // hv='';
       // wv='';
}

//網頁內容更新

 function updateWeb(data){

    var str='';
    var len= data.length;//取得data長度
    
    for(var i=0;i<len;i++){
        //str+= '<li class ="'+data[i].color+'"<a href="#" data-num='+i+'>刪除</a>'
        //+data[i].status+'BMI '+data[i].BMI+'weight '+data[i].weight+'kg '+'height '+data[i].height+'cm </li>'
        //ES6組字串方式`*****`
        str+=`<li class = '${data[i].color} LineSet'><a href = '#' data-Num='${i}'>刪除</a>
        ${data[i].status}
        <span>BMI</span> ${data[i].BMI}
        <span>weight</span> ${data[i].weight} kg   
        <span>height</span>${data[i].height} cm</li>`
          //組字串
        }
        list.innerHTML= str; //插入html標籤
        localStorage.setItem('listData',JSON.stringify(data));
 }



  var BMIShow =document.getElementById('BMIVary');
 //更新現值內容
  function changeBtn(data){ //帶入localStorage data的資料
        btn.setAttribute('class','Btn_hide');//設定一個新class，目的:把原本的btn隱藏
        var Style= '';
        for(var i=0;i<data.length;i++){//插入結果BMI的相關html標籤
            BMIShow.innerHTML = `<div id="reset" class="${data[i].color} changeBtn">
            <p class="BMIShow BMIColor_${data[i].color}">${data[i].BMI}</p>
            <p class="BMITxt_${data[i].color}">BMI</p>
             <div  class="LOOP loop_${data[i].color}" ></div>
            <p id="showStatus" class="Status_${data[i].color}">${data[i].status}</p>
            </div>`
        }
//重製Btn

        var reset =document.getElementById('reset');

        reset.addEventListener('click',resetBtn,false);//綁定監聽

        function resetBtn(){//點擊結果Btn後會清空input,然後把看結果按鈕換回來

        btn.setAttribute('class','origin'); //點擊後把原本Btn的class換回來

        var resultBtn =document.querySelector('.changeBtn');
        resultBtn.setAttribute('class','Btn_hide');//把結果的btn更改class名稱然後隱藏起來
        //清空input
        h.value='';
        w.value='';
                    }

  }

 
  //刪除功能
  function deData(e){
      e.preventDefault;

      if(e.target.tagName !=='A'){return};
      var Num=e.target.dataset.Num;//取得該節點的dataset
      data.splice(Num,1);
       
      localStorage.setItem('listData',JSON.stringify(data));//同步更新資料
       updateWeb(data);//同步更新網頁


  }

