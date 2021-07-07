var budgetcontroller = function(){

    var expenses= function(id,description,value)
    {
        this.id=id;
        this.description=description;
        this.value=value;
    }

    
    var income= function(id,description,value)
    {
        this.id=id;
        this.description=description;
        this.value=value;
    }

    var data={
        allitems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    }

    return{
        additem:function(type,des,val){
            var newitem,id;
            if(data.allitems[type].length>0)
            {
            id=data.allitems[type][data.allitems[type].length-1].id+1;}
            else{
                id=0;
            }

            if(type=="exp")
            {newitem=new expenses(id,des,val)}
            else{
                newitem= new income(id,des,val)
            }
            data.allitems[type].push(newitem);
            return newitem;

        },
        testing:function(){
            console.log(data);
        }
    }

}();



var uicontroller = function(){

    var domstrings={
        inputype:".add__type",
        inputdescription:".add__description",
        inputvalue:".add__value",
        inputbutton:".add__btn",
        incomediv:".income__list",
        expensediv:".expenses__list"

    }

return{
    getinput:function(){
        return {
            type:document.querySelector(domstrings.inputype).value,
            description:document.querySelector(domstrings.inputdescription).value,
            value:document.querySelector(domstrings.inputvalue).value
        }
    },
    getdom:function(){
        return domstrings;
},
    printui:function(obj,type){
        var html,newhtml,elemnet;
        if(type=="exp"){
            elemnet=domstrings.expensediv;
            html= '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix" <div class="item__value">%value%</div><div class="item__percentage">%percentage%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        else if(type=="inc")
        {
            elemnet=domstrings.incomediv;
            html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        newhtml=html.replace("%id%",obj.id);
        newhtml=newhtml.replace("%description%",obj.description);
        newhtml=newhtml.replace("%value%",obj.value);
        console.log(typeof(newhtml));
        document.querySelector(elemnet).insertAdjacentHTML("beforeend",newhtml);




        
    },
    clearfiled:function(){
        var fields,newfield
          fields=document.querySelectorAll(domstrings.inputdescription+"," +domstrings.inputvalue);
         newfield= Array.prototype.slice.call(fields);
          newfield.forEach(function(ele){
              ele.value=""
          })
          newfield[0].focus();

    }


}

}();


var controller= function(bgcontroller,uicntrl){

    function budjetcalc(){}

function ctrladditem(){
    console.log(uicntrl.getinput());
    if(uicntrl.getinput().description!==""&&uicntrl.getinput().value!=NaN &&uicntrl.getinput().value>0)
    {
        var newitem= budgetcontroller.additem(uicntrl.getinput().type,uicntrl.getinput().description,uicntrl.getinput().value);
        budgetcontroller.testing();
        uicntrl.printui(newitem,uicntrl.getinput().type);
        uicntrl.clearfiled();
        budjetcalc();
    
    }

   

}
function seteventlistners(){
    document.querySelector(uicntrl.getdom().inputbutton).addEventListener("click",ctrladditem);

    document.addEventListener("keypress",function(event){
        if(event.keyCode==13)
        {ctrladditem();}
    })
}

return {
    init:function(){
        console.log("application is working")
        return seteventlistners();
    }
}

    

}(budgetcontroller,uicontroller);


controller.init();