$( document ).ready(function() {
    // reload_resources();
    // reload_masters();
    // reload_select();
});

//document.addEventListener('contextmenu', event => event.preventDefault());

var clicked_event;
var option_string="<option value='select' class='option'>Select Resource...</option>";
var master_options = "<option value='select' class='option'>Select Item...</option>";
var master_list = "";

function reload_select(){
    $('.select2').select2();
}

function open_master_modal(pagename){
    price_type="readonly";
    document.getElementById("modal_price1").readOnly = true;
    document.getElementById("modal_type").value = "add";
    document.getElementById("modal_id").value = "999999";
    if(pagename == 'boq'){
        document.getElementById("savenext").hidden = false;
    }else{
        document.getElementById("savenext").hidden = true;
    }
    clear_modal();
    $("#MasterModal").modal("show");
}


function reload_masters(){
    master_options = "<option value='select' class='option'>Select Item...</option>";
    master_list = "";
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
                master_list = master_list + "<li class='list_item'>"+  res_split[1]+"/"+ res_split[2];
            }
        },
        error: function(xhr, errmsg, err){

        }
    });
}

function reload_resources(){
    option_string = "<option value='select' class='option'>Select Resource...</option>";
    $.ajax({
        url: 'reload_resources/',
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
                option_string = option_string + "<option value='"+ res_split[0] +"'>"+ res_split[1]+"/"+ res_split[2] +"</option>";
            }
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Deleting a resource from modal

function delete_resource(event){
    var parent = event.target.parentNode.parentNode;
    parent.remove();
    calculateAmount();
}

// Calculating Amount in add master modal

function calculateAmount(){
    var container = document.getElementsByClassName("modal_master_container")[0];
    var rows = container.getElementsByClassName("modal_resource_row");

    var i;
    var total = 0;
    for(i=0;i<rows.length;i++){
        var price = parseFloat(rows[i].getElementsByClassName("master_price")[0].value);
        var quantity = parseFloat(rows[i].getElementsByClassName("master_quantity")[0].value);
        var amount = rows[i].getElementsByClassName("master_amount")[0];

        total = total + price * quantity;
        amount.value = Number((price * quantity).toFixed(2));
    }

    document.getElementById("master_total").innerHTML = "AED "+ Number(total.toFixed(2)).toLocaleString('en-US');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Setting the price field of resource when an option is selected in modal

function set_modal_res_price(event){
    var parent = event.target.parentNode.parentNode;
    var selected_value = event.target.value;
    
    $.ajax({
        url: 'get_resource_price/',
        type: 'POST',
        async: false,
        data: {data: selected_value},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            parent.getElementsByClassName("master_price")[0].value = json.price;
            calculateAmount();
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Clear the add material modal fields

function clear_modal(){
    document.getElementById("modal_code").value = "";
    document.getElementById("modal_name").value = "";
    document.getElementById("modal_remark").value = "";

    var modal_resource = document.getElementsByClassName("modal_resource_row");
    modal_resource[0].getElementsByClassName("master_resource")[0].selectedIndex = 0;
    modal_resource[0].getElementsByClassName("master_quantity")[0].value = 1;
    modal_resource[0].getElementsByClassName("master_price")[0].value = 0;
    modal_resource[0].getElementsByClassName("master_amount")[0].value = 0;
    document.getElementById("master_total").innerHTML= "AED 00.00";

    var i;
    var rows = [];
    for(i=1;i<modal_resource.length;i++){
        rows.push(modal_resource[i]);
    }

    for(i=0;i<rows.length;i++){
        rows[i].remove();
    }

    reload_select();
}

// Save as new master

function save_as_new_master(){
    var mid = document.getElementById("modal_id").value;
    var boqid;
    try{
        boqid = document.getElementById("boqid").value;
    }catch(error){
        boqid = "999999";
    }

    var code = document.getElementById("modal_code").value;
    var name = document.getElementById("modal_name").value;
    var remark = document.getElementById("modal_remark").value;

    //     boq ID     Master ID     Mater Code     Master Name    Master Remark
    data = boqid+"___"+mid + "___" + code + "___" + name + "___" + remark;

    var master_resource_rows = document.getElementsByClassName("modal_resource_row");
    var i;
    var resource_data="";
    for(i=0;i<master_resource_rows.length;i++){
        var selected_resource = master_resource_rows[i].getElementsByClassName("master_resource")[0].value;
        var quantity = master_resource_rows[i].getElementsByClassName("master_quantity")[0].value;
        var price = master_resource_rows[i].getElementsByClassName("master_price")[0].value;
        var amount = master_resource_rows[i].getElementsByClassName("master_amount")[0].value;

        //  Selected option + Quantity + Unit price + Amount
        if(resource_data == ""){
            resource_data = selected_resource + ",," + quantity + ",," + price + ",," + amount;
        }else{
            resource_data = resource_data + "//" +selected_resource + ",," + quantity + ",," + price + ",," + amount;
        }
    }
    data = data + "___" + resource_data;

    $.ajax({
        url: 'save_as_new_master/',
        type: 'POST',
        async: false,
        data: {data: data},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            clear_modal();
            var masters = document.getElementsByClassName("master");
            var j;
            for(j=0;j<masters.length;j++){
                var option = document.createElement("option");
                option.value = json.master_id;
                option.innerHTML = code + "/" + name;
                masters[j].appendChild(option);
            }
            $("#MasterModal").modal("hide");
            reload_masters();
            set_master_edit_price_as_new(clicked_event, json.master_id);
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Saving the master from the modal

function save_master(op, pagename){
    var mid = document.getElementById("modal_id").value;
    var boqid;
    try{
        boqid = document.getElementById("boqid").value;
    }catch(error){
        boqid = "999999";
    }

    var code = document.getElementById("modal_code").value;
    var name = document.getElementById("modal_name").value;
    var remark = document.getElementById("modal_remark").value;

    //     boq ID     Master ID     Mater Code     Master Name    Master Remark
    data = boqid+"___"+mid + "___" + code + "___" + name + "___" + remark;

    var master_resource_rows = document.getElementsByClassName("modal_resource_row");
    var i;
    var resource_data="";
    for(i=0;i<master_resource_rows.length;i++){
        var selected_resource = master_resource_rows[i].getElementsByClassName("master_resource")[0].value;
        var quantity = master_resource_rows[i].getElementsByClassName("master_quantity")[0].value;
        var price = master_resource_rows[i].getElementsByClassName("master_price")[0].value;
        var amount = master_resource_rows[i].getElementsByClassName("master_amount")[0].value;

        //  Selected option + Quantity + Unit price + Amount
        if(resource_data == ""){
            resource_data = selected_resource + ",," + quantity + ",," + price + ",," + amount;
        }else{
            resource_data = resource_data + "//" +selected_resource + ",," + quantity + ",," + price + ",," + amount;
        }
    }
    data = data + "___" + resource_data;

    $.ajax({
        url: 'save_master/',
        type: 'POST',
        async: false,
        data: {data: data},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            master_id = json.data.split("/")[0]
            status = json.data.split("/")[1]
            if(status != "exist"){
                if(op == 0){
                    $("#MasterModal").modal("hide");
                }

                var masters = document.getElementsByClassName("master");
                var j;
                if(mid == "999999"){
                    for(j=0;j<masters.length;j++){
                        var option = document.createElement("option");
                        option.value = master_id;
                        option.innerHTML = code + "/" + name;
                        masters[j].appendChild(option);
                    }
                }

                if(pagename == "master"){
                    location.reload();
                }else{
                    if(mid != "999999"){
                        set_master_edit_price(clicked_event);
                    }else{
                        reload_masters();
                    }
                }
            }else{
                alert("Master code already exists!")
            }
        },
        error: function(xhr, errmsg, err){

        }
    });
}

var price_type = "";

// Open modal to edit the master item

function edit_master(event){
    clear_modal();
    price_type = "";
    document.getElementById("modal_price1").readOnly = false;

    document.getElementById("savenext").hidden = true;
    document.getElementById("modal_type").value = "edit";
    var parent_row = event.target.parentNode.parentNode;
    var master_id = parent_row.getElementsByClassName("master")[0].value;
    var boq_id = document.getElementById("boqid").value;
    
    $.ajax({
        url: 'get_master_details/',
        type: 'POST',
        async: false,
        data: {data: boq_id+"/"+master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            var details = json.data.split("___");
            var code = details[0];
            var name = details[1];
            var remark = details[2];
            var other = details[3];

            document.getElementById("modal_code").value = code;
            document.getElementById("modal_name").value = name;
            document.getElementById("modal_remark").value = remark;
            document.getElementById("modal_id").value = master_id;

            var resources = other.split("//");

            var i;
            for(i=1;i<resources.length;i++){
                add_modal_resource();
            }

            var master_resources = document.getElementById("MasterModal").getElementsByClassName("master_resource");
            var master_quantities = document.getElementById("MasterModal").getElementsByClassName("master_quantity");
            var master_prices = document.getElementById("MasterModal").getElementsByClassName("master_price");
            var master_amounts = document.getElementById("MasterModal").getElementsByClassName("master_amount");

            var first_resource_split = resources[0].split(",,");
            master_resources[0].value = first_resource_split[0];
            master_quantities[0].value = first_resource_split[1];
            master_prices[0].value = first_resource_split[2];
            master_amounts[0].value = first_resource_split[3];


            for(i=1;i<resources.length;i++){
                first_resource_split = resources[i].split(",,");
                master_resources[i].value = first_resource_split[0];
                master_quantities[i].value = first_resource_split[1];
                master_prices[i].value = first_resource_split[2];
                master_amounts[i].value = first_resource_split[3];
            }

            reload_select();
            calculateAmount();
            $("#MasterModal").modal("show");
        },
        error: function(xhr, errmsg, err){

        }
    });
}

function edit_master2(master_id){
    clear_modal();
    price_type = "readonly";
    document.getElementById("modal_price1").readonly = false;
    //document.getElementById("savenext").hidden = true;
    document.getElementById("modal_type").value = "edit";
    
    $.ajax({
        url: 'get_master_details/',
        type: 'POST',
        async: false,
        data: {data: master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            var details = json.data.split("___");
            var code = details[0];
            var name = details[1];
            var remark = details[2];
            var other = details[3];

            document.getElementById("modal_code").value = code;
            document.getElementById("modal_name").value = name;
            document.getElementById("modal_remark").value = remark;
            document.getElementById("modal_id").value = master_id;

            var resources = other.split("//");
            
            var i;
            for(i=1;i<resources.length;i++){
                add_modal_resource();
            }

            var master_resources = document.getElementById("MasterModal").getElementsByClassName("master_resource");
            var master_quantities = document.getElementById("MasterModal").getElementsByClassName("master_quantity");
            var master_prices = document.getElementById("MasterModal").getElementsByClassName("master_price");
            var master_amounts = document.getElementById("MasterModal").getElementsByClassName("master_amount");

            var first_resource_split = resources[0].split(",,");
            master_resources[0].value = first_resource_split[0];
            master_quantities[0].value = first_resource_split[1];
            master_prices[0].value = first_resource_split[2];
            master_amounts[0].value = first_resource_split[3];


            for(i=1;i<resources.length;i++){
                first_resource_split = resources[i].split(",,");
                master_resources[i].value = first_resource_split[0];
                master_quantities[i].value = first_resource_split[1];
                master_prices[i].value = first_resource_split[2];
                master_amounts[i].value = first_resource_split[3];
            }

            reload_select();
            calculateAmount();
            $("#MasterModal").modal("show");
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Scroll to top

function scroll_to_top(){
    window.scrollTo(0,0);
}

// Deleting category

function delete_category(event){
    event.target.parentNode.parentNode.remove();
    var c =document.getElementById("bigblock").getElementsByClassName("row");
    if(c.length == 0){
        var grand_total = document.getElementById("boq_total");
        grand_total.innerHTML = "Total Selling: AED 00.00<br>Total Dry: AED 00.00";
    }
    recalculate_numbering();
    calculate_boq_total();
}



// Check control + click on price field

function isKeyPressed(event){
    if(event.ctrlKey){
        clicked_event = event;
        edit_master(event);
    }
}

// Deleting master items from the block

function delete_item(event){
    var par = event.target.parentNode.parentNode;
    //var prev_item = par.previousSibling;

    par.remove();
    //prev_item.remove();
    calculate_boq_total();
}

function set_master_edit_price_as_new(event, mid){
    var master_id = mid;
    var boqid = document.getElementById("boqid").value;
    var pricefield = event.target;
    var mfield = event.target.parentNode.parentNode.getElementsByClassName("master")[0];
    
    $.ajax({
        url: 'get_master_price/',
        type: 'POST',
        async: false,
        data: {data: boqid+"/"+master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            pricefield.value = (json.price);
            mfield.value = mid;
            reload_select();
            calculate_boq_total();
        },
        error: function(xhr, errmsg, err){

        }
    });
}

// Setting the price of master item after edit

function set_master_edit_price(event){
    var master_id = event.target.parentNode.parentNode.getElementsByClassName("master")[0].value;
    var boqid = document.getElementById("boqid").value;
    var pricefield = event.target;
    pricefield.value = get_master_price(master_id);
    calculate_boq_total();
}

function prepare_excel_data(){
    var filename = document.getElementById("uploaded_file").files[0].value;
    alert(filename);
}