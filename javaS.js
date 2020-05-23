const phoneF= document.querySelector('#phone-list');
const shoppingCartContent = document.querySelector('#cart-content');
const clearCartBtn = document.querySelector('#clear-cart');
total = 0.00;
arraySum = [1,1,1,1,1,1];
let load =0;

$(document).ready(function() {
    $(".Bcolor").on({
        mouseenter: function () {
            $(this).css("background-color", "cadetblue");//stuff to do on mouse enter
        },
        mouseleave: function () {
            $(this).css("background-color", "transparent");//stuff to do on mouse leave
        }
    });
    $("#able").attr("disabled",true);
    $("#able").css("hover",true);
});

$(document).ready(function () {
    $("#shopping-cart").hide();
    $("#show").on({
        mouseenter: function () {
            $("#shopping-cart").show();
        },
        mouseleave: function () {
            $("#shopping-cart").hide();
        }
    });
    $("#shopping-cart").on({
        mouseenter: function () {
            $("#shopping-cart").show();
        },
        mouseleave: function () {
            $("#shopping-cart").hide();
        }

    });

});

$(document).mouseleave(function () {
    if(load<1){
        alert("good day!!");
        load++;
    }
});

function TPrice(e){
         total =parseFloat( Number(e) + Number(total));
         document.getElementById("T-price").innerText=total;
}

loadEventListeners();

function loadEventListeners(){

       phoneF.addEventListener('click', buyphone);

       shoppingCartContent.addEventListener('click', removePh);

       clearCartBtn.addEventListener('click', clearCart);
}

function buyphone(e){

    if(e.target.classList.contains('ph-add-to-cart')){
       const phone = e.target.parentElement.parentElement;
        getInfo(phone);
    }

}

function getInfo(phone) {

     const phoneInfo = {
        image: phone.querySelector('img').src,
        title: phone.querySelector('h1').textContent,
        price: phone.querySelector('.price').textContent,
         id: phone.querySelector('a').getAttribute('data-id')
    }
       f= $("#cart-content").find('span');
        test =true;

        for(i=0;i<f.length;i++){
            if(f[i].getAttribute('data-id') ==Number(phoneInfo.id)){
                 indexArr = (Number(phoneInfo.id))-1;
               var sum =(arraySum[indexArr])+1;
                arraySum[indexArr]=sum;
                f[i].innerText=sum;
                test=false;
                TPrice(phoneInfo.price);
            }

    }
        if(test){
            addToCart(phoneInfo);
        }
}
function addToCart(phoneShow){
    const row = document.createElement('tr');

    row.innerHTML = `
    <tr>
    <td>
        <img src="${phoneShow.image}" width="100">    
    </td>
    <td >
        ${phoneShow.title}
    </td>  
     <td><span data-id="${phoneShow.id}"class="idata" style="padding: 10px">1</span></td>
     <td class="pr">
        ${phoneShow.price}
    </td>
    <td> <a href ="#" class="remove" >X</a> </td>
    </tr>

    `;
    TPrice(phoneShow.price);
    shoppingCartContent.appendChild(row);
    $("#able").attr("disabled",false);


}

function removePh(e){
    t=$("#phone-list").find('.price');
    let bool =false;


    for(i=0;i<t.length;i++){

        if(t[i].innerText ==Number(e.target.parentElement.parentElement.querySelector('.pr').innerHTML)){
            var sum =(arraySum[i])-1;
            arraySum[i]=sum;
            e.target.parentElement.parentElement.querySelector('.idata').innerHTML=sum;
           if (sum==0){
               bool =true;
               arraySum[i]=1;
           }
        }

    }



     if(e.target.classList.contains('remove')){

         er = -1 * Number(e.target.parentElement.parentElement.querySelector('.pr').innerHTML);
         TPrice(er);
       if(bool){
             e.target.parentElement.parentElement.remove();
         }

         if(shoppingCartContent.firstChild===null){
             $("#able").attr("disabled",true);
         }

     }
}
function clearCart(e){
    shoppingCartContent.innerHTML='';
    total=0.00;
    document.getElementById("T-price").innerText=total;
    $("#able").attr("disabled",true);
    arraySum = [1,1,1,1,1,1];
}
