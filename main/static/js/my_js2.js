$( document ).ready(function() {
    //reload_resources();
    //reload_all_masters();
    reload_all_select();
});

function removeloading(){
    document.getElementById("overlay").style.display = "none";
}

var master_options = "";

function reload_all_masters(){
    master_options = "<option value='select' class='option'>Select Master Item...</option>";
    $.ajax({
        url: 'reload_masters/',
        type: 'POST',
        async: false,
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            var big_data = json.big_data;
            var data_split = big_data.split("//"); //Splitted into individual master

            // Looping through each master
            var i;
            for(i=0;i<data_split.length;i++){
                var res_split = data_split[i].split(",,"); // Split resource into it's components
                master_options = master_options + "<option value='"+ res_split[0] +"'>"+ res_split[1]+"/"+ res_split[2] +"</option>";
            }
        },
        error: function(xhr, errmsg, err){

        }
    });
}

function recalculate_numbering(){
    var heads = document.getElementsByClassName("heading_number");
    var i;
    for(i=0;i<heads.length;i++){
        heads[i].innerHTML = (i);
    }

    var master_containers = document.getElementsByClassName("first_master");
    for(i=0;i<master_containers.length;i++){
        var item_numbers = master_containers[i].getElementsByClassName("item_number");
        var j;
        for(j=0;j<item_numbers.length;j++){
            item_numbers[j].innerHTML = i+"."+ (j+1);
        }
    }
}



function clone_block(){
    var name = document.getElementsByClassName("first_master")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    clone.getElementsByClassName("master")[0].innerHTML = master_options;
    name.parentNode.appendChild(clone);
    recalculate_numbering();
    //reload_all_select();
}



function clone_resource(price_type){
    var name = document.getElementsByClassName("modal_resource_row")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    if(price_type == 'readonly'){
        clone.getElementsByClassName("master_price").readOnly = true;
    }
    name.parentNode.appendChild(clone);
    recalculate_numbering();
    //reload_all_select();
}



function clone_excel_master(par="none", desc="", qt="", uom=""){
    var bb_container;
    if(par == "none"){
        bb_container = event.target.parentNode.parentNode;
    }else{
        bb_container = par;
    }
    var name = bb_container.getElementsByClassName("excel_master_row_container")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    clone.getElementsByClassName("excel_uom")[0].value = uom;
    clone.getElementsByClassName("excel_desc")[0].value = desc;
    clone.getElementsByClassName("excel_quantity")[0].value = qt;
    clone.getElementsByClassName("cross")[0].style.visibility = "visible";
    name.parentNode.appendChild(clone);
    recalculate_excel_numbering();
}



// Setting the price of master item as selected

function set_master_price(event){
    var master_id = event.target.value;
    var pricefield = event.target.parentNode.parentNode.getElementsByClassName("price")[0];
    pricefield.value = get_master_price(master_id);
    calculate_boq_total();
}

// Method to get price of a master element

function get_master_price(master){
    var prc = 0;
    var boqid = document.getElementById("boqid").value;
    $.ajax({
        url: 'get_master_price/',
        type: 'POST',
        async: false,
        data: {data: boqid+"/"+master},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            prc = Number(json.price.toFixed(2));
        },
        error: function(xhr, errmsg, err){

        }
    });

    return prc;
}

// Calculating total amount of the boq and blocks

function calculate_boq_total(){
    var child_rows = document.getElementsByClassName("child_rows");
    var grand_total = document.getElementById("boq_total");
    var dry_total = 0;
    var sell_total = 0;
    var i;
    for(i=1;i<child_rows.length;i++){
        var pricefield = child_rows[i].getElementsByClassName("price")[0];
        var quantityfield = child_rows[i].getElementsByClassName("quantity")[0];
        var amountfield = child_rows[i].getElementsByClassName("amount")[0];
        var factorfield = child_rows[i].getElementsByClassName("factor")[0];
        var sell_pricefield = child_rows[i].getElementsByClassName("sell_price")[0];
        var sell_amountfield = child_rows[i].getElementsByClassName("sell_amount")[0];

        amountfield.value = Number((parseFloat(quantityfield.value) * parseFloat(pricefield.value)).toFixed(2));

        // Applying factors and calucalting selling price

        var factorvalue = parseFloat(document.getElementById(factorfield.value).value);
        sell_pricefield.value = Number((parseFloat(pricefield.value) * factorvalue).toFixed(2));
        sell_amountfield.value = Number((parseFloat(amountfield.value) * factorvalue).toFixed(2));

        dry_total += parseFloat(quantityfield.value) * parseFloat(pricefield.value);
        sell_total += parseFloat(amountfield.value) * factorvalue;
    }
    grand_total.innerHTML = "Total Selling: AED "+ Number(sell_total.toFixed(2)).toLocaleString('en-US') + "<br>Total Dry: AED "+Number(dry_total.toFixed(2)).toLocaleString('en-US');

    var bigblock = document.getElementById("bigblock");
    var bbs = bigblock.getElementsByClassName("bb");
    var l;
    for(l=0;l<bbs.length;l++){
        var dt = 0;
        var st=0;
        var drys = bbs[l].getElementsByClassName("amount");
        var sells = bbs[l].getElementsByClassName("sell_amount");
        
        var m;
        for(m=0;m<drys.length;m++){
            dt += parseFloat(drys[m].value);
            st += parseFloat(sells[m].value);
        }

        var topdetails = bbs[l].parentNode.parentNode.getElementsByClassName("topdetail")[l];
        topdetails.innerHTML = "Dry: AED "+ Number(dt.toFixed(2)).toLocaleString('en-US') + " / Selling: AED " + Number(st.toFixed(2)).toLocaleString('en-US');
    }
}

// Save BOQ

function save_with_button(){
    save_boq();
    open_alert_modal();
}

function save_boq(){
    var boq_id = document.getElementById("boqid").value;
    var factor1 = document.getElementById("f1").value;
    var factor2 = document.getElementById("f2").value;
    var factor3 = document.getElementById("f3").value;
    var factor4 = document.getElementById("f4").value;
 
    data = factor1 + "/" + factor2 + "/" + factor3 + "/" + factor4;
 
    var bbs = document.getElementsByClassName("bb");
    var i;
    var small_data = "";
    for(i=1;i<bbs.length;i++){
        var heading = bbs[i].getElementsByClassName("heading")[0].value;
 
        var topdetails = bbs[i].getElementsByClassName("topdetail")[0].innerHTML;
        var topsplit = topdetails.split(" / ");
        var dry = topsplit[0].replace("Dry: AED ","");
        var sell = topsplit[1].replace("Selling: AED ","");

        if(small_data == ""){
            small_data = heading + "_____" + dry + "_____" + sell;
        }else{
            small_data = small_data + "--------" + heading + "_____" + dry + "_____" + sell;
        }

        var child_rows = bbs[i].getElementsByClassName("child_rows");
        var j;
        var master_data = "";
        for(j=0;j<child_rows.length;j++){
            var master_item = child_rows[j].getElementsByClassName("master")[0].value;
            var quantity = child_rows[j].getElementsByClassName("quantity")[0].value;
            var uom = child_rows[j].getElementsByClassName("uom")[0].value;
            var price = child_rows[j].getElementsByClassName("price")[0].value;
            var amount = child_rows[j].getElementsByClassName("amount")[0].value;
            var factor = child_rows[j].getElementsByClassName("factor")[0].value;
            var sell_price = child_rows[j].getElementsByClassName("sell_price")[0].value;
            var sell_amount = child_rows[j].getElementsByClassName("sell_amount")[0].value;
            var remark = child_rows[j].getElementsByClassName("remark")[0].value;
            
            if(master_data == ""){
                master_data = master_item + "........" + quantity + "........" + uom + "........" + price + "........" + amount + "........" + factor + "........" +
                            sell_price + "........" + sell_amount + "........" + remark;
            }else{
                master_data = master_data + ">>>>>" + master_item + "........" + quantity + "........" + uom + "........" + price + "........" + amount + "........" + factor + "........" +
                            sell_price + "........" + sell_amount + "........" + remark;
            }
        }

        small_data  = small_data + "_____" + master_data;
    }

    data = boq_id + ";;;;;" + data + ";;;;;" + small_data;
    //alert(data);
    $.ajax({
        url: 'save_boq/',
        type: 'POST',
        async: false,
        data: {data: data},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            //open_alert_modal();
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Loading data from saved boq

function load_category_blocks(){
    bid = document.getElementById("boqid").value;
    
    $.ajax({
        url: 'load_blocks/',
        type: 'POST',
        async: false,
        data: {data: bid},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            data = (json.data);
            
            var blocks = data.split(">>>>>");
            if(data.length > 2){
            var i;
            for(i=0;i<blocks.length;i++){
                var detail = blocks[i].split("/////");
                var heading = detail[0];
                var dry = detail[1];
                var sell = detail[2];

                clone_block();

                var head = document.getElementsByClassName("heading")[i+1];
                var topdetail = document.getElementsByClassName("topdetail")[i+1];
                head.value = heading;
                topdetail.innerHTML = "Dry: AED " + dry + " / Selling: AED " + sell;
                get_boq_masters(detail[3], bid);
            }

        }
        removeloading();
        },
        error: function(xhr, errmsg, err){

        }
    });
}

function get_boq_masters(item_id, bid){
    $.ajax({
        url: 'get_masters/',
        type: 'POST',
        async: false,
        data: {data: bid+"/"+item_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            data = (json.data).split(">>>>>");
            for(i=0;i<data.length;i++){
                var split2 = data[i].split("/////");
                
                var master_id = split2[0];
                var qtt = split2[1];
                var remark = split2[6];
                var fact = split2[7];
                var uom = split2[8];
                
                if(i > 0){
                    clone_master_row(automatic=true);
                }
                var ll = document.getElementsByClassName("child_rows").length -1;
                var child_rows = document.getElementsByClassName("child_rows")[ll];

                var masterfields = child_rows.getElementsByClassName("master");
                var masterfield = masterfields[0];
                masterfield.value = master_id;

                var qttfields = child_rows.getElementsByClassName("quantity");
                var qttfield = qttfields[0];
                qttfield.value = qtt;

                var factorfields = child_rows.getElementsByClassName("factor");
                var factorfield = factorfields[0];
                factorfield.value = fact;

                var remarkfields = child_rows.getElementsByClassName("remark");
                var remarkfield = remarkfields[0];
                remarkfield.value = remark;

                var uomfields = child_rows.getElementsByClassName("uom");
                var uomfield = uomfields[0];
                uomfield.value = uom;

            }
            set_all_master_pricenew()
            calculate_boq_total();
            
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Setting the price of all master items when loading a BOQ

function set_all_master_pricenew(){
    var all_rows = document.getElementsByClassName("child_rows");
    var i;
    for(i=0;i<all_rows.length;i++){
        var master = all_rows[i].getElementsByClassName("master")[0].value;
        var price = get_master_price(master);

        all_rows[i].getElementsByClassName("price")[0].value = price;
    }
}

