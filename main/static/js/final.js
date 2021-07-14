function reload_all_select(){
    $('.select2').select2();
}

function open_alert_modal(){
    var al = document.getElementsByClassName("tst")[0];
    al.style.visibility = "visible";
    al.classList.add("fadein");
    setTimeout(close_alert, 1000);
}

function close_alert(){
    var al = document.getElementsByClassName("tst")[0];
    al.classList.remove("fadein");
    al.style.visibility = "hidden";
}

var clicked_event = null;

function open_select(event){
    var cls = (event.target.nextElementSibling.classList);
    if(cls.contains("show")){
        event.target.nextElementSibling.classList.remove("show");
    }else{
        event.target.nextElementSibling.classList.add("show");
    }
}

function search_resource(event){
    var txt = event.target.value;
    var options = document.getElementsByClassName("res_option");
    var i;
    for(i=0;i<options.length;i++){
        if(options[i].innerHTML.toLowerCase().includes(txt.toLowerCase())){
            options[i].hidden=false;
        }else{
            options[i].hidden = true;
        }
    }
}

function search_master(event){
    var txt = event.target.value;
    var options = document.getElementsByClassName("master_option");
    var i;
    for(i=0;i<options.length;i++){
        if(options[i].innerHTML.toLowerCase().includes(txt.toLowerCase())){
            options[i].hidden=false;
        }else{
            options[i].hidden = true;
        }
    }
}

function add_search_resource(event){
    var txt = event.target.value;
    var options = document.getElementsByClassName("add_res_option");
    var i;
    for(i=0;i<options.length;i++){
        if(options[i].innerHTML.toLowerCase().includes(txt.toLowerCase())){
            options[i].hidden=false;
        }else{
            options[i].hidden = true;
        }
    }
}

function set_value(event){
    event.target.parentNode.previousElementSibling.value = event.target.innerHTML;
    event.target.parentNode.previousElementSibling.previousElementSibling.value = event.target.value;
    event.target.parentNode.classList.remove("show");
    set_resource_price_modal(event);
}

function set_value_masterpage(event){
    event.target.parentNode.previousElementSibling.value = event.target.innerHTML;
    event.target.parentNode.previousElementSibling.previousElementSibling.value = event.target.value;
    event.target.parentNode.classList.remove("show");
    set_resource_price_master_page_modal(event);
}

function set_master_value(event){
    event.target.parentNode.previousElementSibling.value = event.target.innerHTML;
    event.target.parentNode.previousElementSibling.previousElementSibling.value = event.target.value;
    event.target.parentNode.classList.remove("show");
    set_master_price_modal(event);
}

function set_add_value(event){
    event.target.parentNode.previousElementSibling.value = event.target.innerHTML;
    event.target.parentNode.previousElementSibling.previousElementSibling.value = event.target.value;
    event.target.parentNode.classList.remove("show");
    set_add_resource_price_modal(event);
}

function get_category_name(cat){
    var return_data = "";
    $.ajax({
        url: 'get_category_name/',
        type: 'POST',
        async: false,
        data: {data: cat},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.data);
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
    return return_data;
}

function get_master_detail_new(boq_id,master_id){
    var return_data = "";
    $.ajax({
        url: 'get_master_detail_new/',
        type: 'POST',
        async: false,
        data: {data: boq_id+"/////"+master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.master_data);
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
    return return_data;
}

function get_my_master_details(master_id){
    var return_data = "";
    $.ajax({
        url: 'get_my_master_details/',
        type: 'POST',
        async: false,
        data: {mid: master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.master_data);
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
    return return_data;
}

function get_resource_detail_new(resource_id){
    var return_data = "";
    $.ajax({
        url: 'get_resource_detail_new/',
        type: 'POST',
        async: false,
        data: {data: resource_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.resource_data);
        },
        error: function(xhr, errmsg, err){

        }
    });
    return return_data;
}

function get_child_master_detail(item_id, master_id){
    var return_data = "";
    $.ajax({
        url: 'get_child_master_detail/',
        type: 'POST',
        async: false,
        data: {data: item_id + "/////" + master_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.child_data);
        },
        error: function(xhr, errmsg, err){

        }
    });
    return return_data;
}

function get_excel_boq_data(boq_id){
    var return_data = "";
    $.ajax({
        url: 'get_excel_boq_data/',
        type: 'POST',
        async: false,
        data: {data: boq_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.excel_data);
        },
        error: function(xhr, errmsg, err){

        }
    });
    return return_data;
}

function get_boq_data(boq_id){
    var return_data = "";
    $.ajax({
        url: 'get_boq_data/',
        type: 'POST',
        async: false,
        data: {data: boq_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.boq_data);
        },
        error: function(xhr, errmsg, err){

        }
    });
    return return_data;
}

function get_boq_headings(boq_id){
    var return_data = "";
    $.ajax({
        url: 'get_boq_headings/',
        type: 'POST',
        async: false,
        data: {data: boq_id},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            return_data = (json.heading_data);
        },
        error: function(xhr, errmsg, err){

        }
    });

    return return_data;
}

function clone_excel_block(){
    var name = document.getElementsByClassName("excel_row")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    name.parentNode.appendChild(clone);
    recalculate_excel_numbering();
}

function clone_master_row(event){
    var bb_container = event.target.parentNode.parentNode; 
    var name = bb_container.getElementsByClassName("excel_master_row_container")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    name.parentNode.appendChild(clone);
    recalculate_excel_numbering();
}

function clone_master_row_auto(desc, qt, uom, mid, fact, rem){
    var boqid = document.getElementById("boqid").value;
    var rc = document.getElementsByClassName("excel_master_row_container")
    var name = rc[rc.length-1];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    if(rem == "None"){
        rem="";
    }
    clone.getElementsByClassName("excel_desc")[0].innerHTML = desc;
    clone.getElementsByClassName("excel_quantity")[0].value = qt;
    clone.getElementsByClassName("excel_uom")[0].value = uom;
    clone.getElementsByClassName("excel_remark")[0].value = rem;
    clone.getElementsByClassName("excel_factor")[0].value = fact;
    clone.getElementsByClassName("my_master_id")[0].value = mid;

    if(mid != "None" && mid != ""){
        var master_data = get_master_detail_new(boqid, mid);
        var msp = master_data.split("___")[4];
        clone.getElementsByClassName("excel_price")[0].value = msp;
    }else{
        clone.getElementsByClassName("excel_price")[0].value = 0;
    }
    name.parentNode.appendChild(clone);
    recalculate_excel_numbering();
}

function clone_resource_row(price, uom, cat, reamrk){
    var name = document.getElementsByClassName("modal_resource_row")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    clone.getElementsByClassName("selected_resource")[0].value = null;
    clone.getElementsByClassName("master_resource")[0].value = null;
    clone.getElementsByClassName("master_quantity")[0].value = "1";
    clone.getElementsByClassName("master_price")[0].value = "0";
    clone.getElementsByClassName("master_amount")[0].value = "0";
    clone.getElementsByClassName("master_remark")[0].value = "";
    clone.getElementsByClassName("master_category")[0].value = "material";
    clone.getElementsByClassName("cross")[0].style.visibility = "visible";
    name.parentNode.appendChild(clone);

    recalculate_excel_numbering();
}

function clone_add_resource_row(price, uom, cat, reamrk){
    var name = document.getElementsByClassName("add_modal_resource_row")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    clone.getElementsByClassName("add_selected_resource")[0].value = null;
    clone.getElementsByClassName("add_master_resource")[0].value = null;
    clone.getElementsByClassName("add_master_quantity")[0].value = "1";
    clone.getElementsByClassName("add_master_price")[0].value = "0";
    clone.getElementsByClassName("add_master_amount")[0].value = "0";
    clone.getElementsByClassName("add_master_remark")[0].value = "";
    clone.getElementsByClassName("add_cross")[0].style.visibility = "visible";
    name.parentNode.appendChild(clone);

    recalculate_excel_numbering();
}

function clone_excel_description(container,b){
    var bb_container = container
    var name = bb_container.getElementsByClassName("excel_comment")[0];
    var clone = name.cloneNode(true);
    clone.hidden = false;
    clone.innerHTML = b;
    name.parentNode.appendChild(clone);
    recalculate_excel_numbering();
}

function recalculate_excel_numbering(){
    var heads = document.getElementsByClassName("excel_heading_number");
    var i;
    for(i=0;i<heads.length;i++){
        heads[i].innerHTML = (i);
    }

    var master_containers = document.getElementsByClassName("excel_row");
    for(i=0;i<master_containers.length;i++){
        var item_numbers = master_containers[i].getElementsByClassName("excel_item_number");
        var j;
        for(j=0;j<item_numbers.length;j++){
            item_numbers[j].innerHTML = i+"."+ (j);
        }
    }
    calculate_final_price();
}

function delete_excel_category(event){
    event.target.parentNode.parentNode.remove();
    var c =document.getElementById("bigblock").getElementsByClassName("excel_row");
    if(c.length == 1){
        var grand_total = document.getElementById("boq_total");
        grand_total.innerHTML = "Total Selling: AED 00.00<br>Total Dry: AED 00.00";
    }
    recalculate_excel_numbering();
    calculate_boq_total();
}

function delete_excel_master(event){
    var par = event.target.parentNode.parentNode;
    par.remove();
    recalculate_excel_numbering();
}

function delete_resource(event){
    event.target.parentNode.remove();
    calculate_modal_price();
}

function delete_add_resource(event){
    event.target.parentNode.remove();
    calculate_add_modal_price();
}

function load_excel_blocks(){
    //var t0 = performance.now();
    document.getElementById("overlay").hidden = false;
    var data = document.getElementById("datatext").innerHTML;
    var data_split = data.split("/////");
    var i;
    var head;
    for(i=0;i<data_split.length;i++){
        var split2 = data_split[i].split("^^^^^");
        let isnum = /^\d+$/.test(split2[0]);
        if (isnum == true){
            clone_excel_block();
            var heads = document.getElementsByClassName("excel_heading");
            var l = heads.length;
            head = heads[heads.length-1]
            head.value = split2[1];
        }else{
            if(split2[1] != "None" && split2[1] != ""){
                if((split2[2] != "None" && split2[2] != "") || (split2[3] != "None" && split2[3] != "")){
                    var par = head.parentNode;
                    var container = par.getElementsByClassName("bb_container")[0];
                    clone_master_row_auto(split2[1], split2[2], split2[3], split2[4], split2[5], split2[6]);
                }else{
                    var par = head.parentNode;
                    var container = par.getElementsByClassName("bb_container")[0];
                    clone_excel_description(container, split2[1]);
                }
            }
        }
    }
    document.getElementById("load_excel_data").hidden=true;
    calculate_final_price();
    document.getElementById("overlay").hidden = true;

    getContent();
    var allins = document.getElementById("bigblock").getElementsByTagName("input");
    var kk;
    for(kk=0;kk<allins.length;kk++){
        allins[kk].addEventListener("change", function(){
            getContent();
        });
    }
    //var t1 = performance.now()
    //alert(t1-t0);
}

var originalContent = [];
var redoContent = [];

var current_undo = 0;

function setContent(content) {
    document.getElementById('bigblock').outerHTML = content;
}

function getContent() {
    var els = document.getElementById('bigblock').getElementsByTagName("input");
    var i;
    for(i=0;i<els.length;i++){
        $(els[i]).attr('value', $(els[i]).val());
    }
    originalContent.push(document.getElementById('bigblock').outerHTML);
    current_undo = 0;
}

function resetContent() {
    if(originalContent.length > 1){
        setContent(originalContent[originalContent.length - 2]);
        redoContent.push(originalContent[originalContent.length-1]);
        originalContent.pop();
    }

    var allins = document.getElementById("bigblock").getElementsByTagName("input");
    var kk;
    for(kk=0;kk<allins.length;kk++){
        allins[kk].addEventListener("change", function(){
            getContent();
        });
    }
}


function calculate_final_price(){
    var child_rows = document.getElementsByClassName("child_rows");
    var grand_total = document.getElementById("boq_total");
    var dry_total = 0;
    var sell_total = 0;
    var i;
    for(i=1;i<child_rows.length;i++){
        var pricefield = child_rows[i].getElementsByClassName("excel_price")[0];
        var quantityfield = child_rows[i].getElementsByClassName("excel_quantity")[0];
        var amountfield = child_rows[i].getElementsByClassName("excel_amount")[0];
        var factorfield = child_rows[i].getElementsByClassName("excel_factor")[0];
        var sell_pricefield = child_rows[i].getElementsByClassName("excel_sell_price")[0];
        var sell_amountfield = child_rows[i].getElementsByClassName("excel_sell_amount")[0];

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
        var drys = bbs[l].getElementsByClassName("excel_amount");
        var sells = bbs[l].getElementsByClassName("excel_sell_amount");

        var m;
        for(m=0;m<drys.length;m++){
            dt += parseFloat(drys[m].value);
            st += parseFloat(sells[m].value);
        }
        var topdetails = bbs[l].getElementsByClassName("topdetail")[0];
        topdetails.innerHTML = "Dry: AED "+ Number(dt.toFixed(2)).toLocaleString('en-US') + " / Selling: AED " + Number(st.toFixed(2)).toLocaleString('en-US');
    }
}

function calculate_modal_price(){
    var container = document.getElementsByClassName("modal_master_container")[0];
    var rows = container.getElementsByClassName("modal_resource_row");
    var i;
    var total = 0;
    for(i=0;i<rows.length;i++){
        var qt =rows[i].getElementsByClassName("master_quantity")[0].value;
        var prc = rows[i].getElementsByClassName("master_price")[0].value;
        var t = parseFloat(qt) * parseFloat(prc);
        total += t;
        rows[i].getElementsByClassName("master_amount")[0].value = Number(t.toFixed(2));
    }
    document.getElementById("master_total").innerHTML = "AED " + Number(total.toFixed(2));
}

function calculate_add_modal_price(){
    var container = document.getElementsByClassName("add_modal_master_container")[0];
    var rows = container.getElementsByClassName("add_modal_resource_row");
    var i;
    var total = 0;
    for(i=0;i<rows.length;i++){
        var qt =rows[i].getElementsByClassName("add_master_quantity")[0].value;
        var prc = rows[i].getElementsByClassName("add_master_price")[0].value;
        var t = parseFloat(qt) * parseFloat(prc);
        total += t;
        rows[i].getElementsByClassName("add_master_amount")[0].value = Number(t.toFixed(2));
    }
    document.getElementById("add_master_total").innerHTML = "AED " + Number(total.toFixed(2));
}

function price_clicked(event){
    if(event.ctrlKey){
        clicked_event = event;
        open_master_select_modal();
    }
}

function open_master_select_modal(){
    clear_master_select_modal();
    var boqid = document.getElementById("boqid").value;
    var mid = clicked_event.target.previousElementSibling.value;
    
    if(mid != "" && mid != "None"){
        var master_detail = get_master_detail_new(boqid, mid);
        var m_split = master_detail.split("___");

        document.getElementById("master_item").value = mid;
        document.getElementsByClassName("master_select").value = "";
        document.getElementsByClassName("master_select")[0].value = m_split[0] + " / " + m_split[1];
        document.getElementById("master_code").value = m_split[0];
        document.getElementById("master_name").value = m_split[1];
        document.getElementById("master_remark").value = m_split[2];
        create_resource(m_split[3], m_split[5]);
    }

    $("#MasterModal").modal("show");
}

function clear_master_select_modal(){
    document.getElementsByClassName("master_select")[0].value = "";
    document.getElementById("master_code").value = "";
    document.getElementById("master_name").value = "";
    document.getElementById("master_remark").value = "";
    document.getElementById("master_code").value = "";

    var resource_rows = document.getElementsByClassName("modal_resource_row");
    var l =resource_rows.length-1;
    var i;
    for(i=0;i<l;i++){
        resource_rows[i].remove();
    }
}

function clear_add_master_select_modal(){
    document.getElementById("add_master_code").value = "";
    document.getElementById("add_master_name").value = "";
    document.getElementById("add_master_remark").value = "";
    document.getElementById("add_master_code").value = "";

    var resource_rows = document.getElementsByClassName("add_modal_resource_row");
    var l =resource_rows.length-1;
    var i;
    for(i=0;i<l;i++){
        resource_rows[i].remove();
    }
}

function set_master_price_modal(event){
    var boq_id = document.getElementById("boqid").value;
    
    var selected_value = event.target.parentNode.parentNode.getElementsByClassName("selected_master")[0].value;
    var master_detail = get_master_detail_new(boq_id, selected_value);
    var master_split = master_detail.split("___");
    document.getElementById("master_code").value = master_split[0];
    document.getElementById("master_name").value = master_split[1];
    document.getElementById("master_remark").value = master_split[5];

    clicked_event.target.previousElementSibling.value = selected_value;

    var components = master_split[3];
    create_resource(components, master_split[5]);
}

function create_resource(components, tp){
    var resource_rows = document.getElementsByClassName("modal_resource_row");
    var l =resource_rows.length-1;
    var i;
    for(i=0;i<l;i++){
        resource_rows[i].remove();
    }

    var comps = components.split("//");

    for (i=0;i<comps.length;i++){
        var sp1 = comps[i].split(",,");
        var res_details = get_resource_detail_new(sp1[0]).split("/////");
        var nm = res_details[1];
        var cd = res_details[0];
        var prc = res_details[2];
        var cat = res_details[3];
        var remark = sp1[sp1.length-1];

        if(i>0){
            clone_resource_row();
        }
        var reses = document.getElementsByClassName("selected_resource");
        reses[reses.length-1].value = sp1[0];

        var quantities = document.getElementsByClassName("master_quantity");
        quantities[quantities.length-1].value = sp1[1];

        var names = document.getElementsByClassName("master_resource");
        names[names.length-1].value = cd + " / " + nm;

        var prices = document.getElementsByClassName("master_price");
        if(tp == "edit"){
            prices[prices.length-1].value = sp1[2];
        }else{
            prices[prices.length-1].value = prc;
        }

        var remarks = document.getElementsByClassName("master_remark");
        remarks[remarks.length-1].value = remark;

        var cats = document.getElementsByClassName("master_category");
        cats[cats.length-1].value = get_category_name(cat);
    }
    calculate_modal_price();
}

function set_resource_price_modal(event){
    var selected_value = event.target.value;
    var resource_details = get_resource_detail_new(selected_value);
    var resource_split = resource_details.split("/////");

    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_price")[0].value = resource_split[2];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_category")[0].value = resource_split[3];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_remark")[0].value = resource_split[4];

    calculate_modal_price();
}

function set_resource_price_master_page_modal(event){
    var selected_value = event.target.value;
    var resource_details = get_resource_detail_new(selected_value);
    var resource_split = resource_details.split("/////");

    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_price")[0].value = resource_split[2];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_category")[0].value = resource_split[3];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("master_remark")[0].value = resource_split[4];

    calculate_modal_price();
}

function set_add_resource_price_modal(event){
    var selected_value = event.target.value;
    var resource_details = get_resource_detail_new(selected_value);
    var resource_split = resource_details.split("/////");

    event.target.parentNode.parentNode.parentNode.getElementsByClassName("add_master_price")[0].value = resource_split[2];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("add_master_category")[0].value = resource_split[3];
    event.target.parentNode.parentNode.parentNode.getElementsByClassName("add_master_remark")[0].value = resource_split[4];

    calculate_add_modal_price();
}

function save_excel_master(){
    var bid = document.getElementById("boqid").value;
    var mid = document.getElementsByClassName("selected_master")[0].value;
    var code = document.getElementById("master_code").value;
    var name = document.getElementById("master_name").value;
    var remark = document.getElementById("master_remark").value;
    var data = bid + "/////" + mid + "/////" +code + "/////" + name + "/////" + remark;

    var reses = document.getElementsByClassName("modal_resource_row");
    var i;
    var sdata = "";
    for(i=0;i<reses.length;i++){
        var rid = reses[i].getElementsByClassName("selected_resource")[0].value;
        var qt = reses[i].getElementsByClassName("master_quantity")[0].value;
        var rem = reses[i].getElementsByClassName("master_remark")[0].value;
        var prc = reses[i].getElementsByClassName("master_price")[0].value;
        var amnt = reses[i].getElementsByClassName("master_amount")[0].value;

        if(sdata == ""){
            sdata = rid + ",," + qt + ",," + prc + ",," + amnt + ",," + rem;
        }else{
            sdata += "//" + rid + ",," + qt + ",," + prc + ",," + amnt + ",," + rem;
        }
        
    }

    $.ajax({
        url: 'save_excel_master/',
        type: 'POST',
        async: false,
        data: {data: data + "^^^^^" + sdata},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            $("#AddMasterModal").modal("hide");
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
}

function save_add_excel_master(tp){
    var code = document.getElementById("add_master_code").value;
    var name = document.getElementById("add_master_name").value;
    var remark = document.getElementById("add_master_remark").value;
    var data = code + "/////" + name + "/////" + remark;

    var reses = document.getElementsByClassName("add_modal_resource_row");
    var i;
    var sdata = "";
    for(i=0;i<reses.length;i++){
        var rid = reses[i].getElementsByClassName("add_selected_resource")[0].value;
        var qt = reses[i].getElementsByClassName("add_master_quantity")[0].value;
        var rem = reses[i].getElementsByClassName("add_master_remark")[0].value;
        var prc = reses[i].getElementsByClassName("add_master_price")[0].value;
        var amnt = reses[i].getElementsByClassName("add_master_amount")[0].value;
        
        if(sdata == ""){
            sdata = rid + ",," + qt + ",," + prc + ",," + amnt + ",," + rem;
        }else{
            sdata += "//" + rid + ",," + qt + ",," + prc + ",," + amnt + ",," + rem;
        }
        
    }

    $.ajax({
        url: 'save_add_excel_master/',
        type: 'POST',
        async: false,
        data: {data: data + "^^^^^" + sdata},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            mmid = json.data;
            var master_fields = document.getElementsByClassName("master_dropdown_content");
            var n;
            for(n=0;n<master_fields.length;n++){
                var opt = master_fields[n].getElementsByClassName("master_option")[0];
                var clone = opt.cloneNode(true);
                clone.hidden = false;
                clone.value = mmid;
                clone.innerHTML = code + " / "+ name;
                opt.parentNode.appendChild(clone);      
            }
            $("#AddMasterModal").modal("hide");
            if(tp == "next"){
                setTimeout(function()
                {   
                    //clear_add_master_select_modal();
                    $("#AddMasterModal").modal("show");
                }, 300);
            }
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
}

function select_master(){
    save_excel_master();
    clicked_event.target.value = document.getElementById("master_total").innerHTML.replace("AED ","");
    $("#MasterModal").modal("hide");
    calculate_final_price();
}

function save_my_boq(){
    var boqid = document.getElementById("boqid").value;
    var all_bbs = document.getElementsByClassName("bb");
    var i;
    var data = "";
    for(i=1;i<all_bbs.length;i++){
        if(data == ""){
            data  = all_bbs[i].getElementsByClassName("excel_heading_number")[0].innerHTML + "^^^^^" + 
            all_bbs[i].getElementsByClassName("excel_heading")[0].value + "^^^^^None^^^^^None^^^^^None^^^^^None^^^^^None";
        }else{
            data  = data + "/////" + all_bbs[i].getElementsByClassName("excel_heading_number")[0].innerHTML + "^^^^^" + 
            all_bbs[i].getElementsByClassName("excel_heading")[0].value + "^^^^^None^^^^^None^^^^^None^^^^^None^^^^^None";
        }
        var bb_container = all_bbs[i].getElementsByClassName("bb_container")[0];
        var children = bb_container.childNodes;
        var j;
        for(j=2;j<children.length;j++){
            if(children[j].hidden == false){
                var chcls = children[j].classList;
                if(chcls != null){
                    if (chcls.contains("excel_comment")){
                        data += "/////None^^^^^" + (children[j].innerHTML) + "^^^^^None^^^^^None^^^^^None^^^^^None^^^^^None";
                    }
                    if (chcls.contains("excel_master_row_container")){
                        var chrow = children[j].getElementsByClassName("child_rows")[0];
                        var desc = chrow.getElementsByClassName("excel_desc")[0].value;
                        var qt = chrow.getElementsByClassName("excel_quantity")[0].value;
                        var uom = chrow.getElementsByClassName("excel_uom")[0].value;
                        var myid = chrow.getElementsByClassName("my_master_id")[0].value;
                        var fact = chrow.getElementsByClassName("excel_factor")[0].value;
                        var rem = chrow.getElementsByClassName("excel_remark")[0].value;

                        if(uom == "" || uom == null){
                            uom = "No.";
                        }
                        data += "/////None^^^^^" + desc + "^^^^^" + qt + "^^^^^" + uom + "^^^^^" + myid + "^^^^^" + fact + "^^^^^" + rem;
                    }
                }
        }
    }
    }

    $.ajax({
        url: 'save_my_boq/',
        type: 'POST',
        async: false,
        data: {data: boqid+".........."+data},
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            var return_data = (json.status);
            open_alert_modal();
        },
        error: function(xhr, errmsg, err){
            alert(err);
        }
    });
}

function loginuser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(username.length == 0 || password.length == 0){
        alert("Please enter both username and password!");
    }else{
        $.ajax({
            url: 'loginuser/',
            type: 'POST',
            async: false,
            data: {data: username+"/////"+password},
            csrfmiddlewaretoken: "{{csrf_token}}",

            success: function(json){
                if(json.data == "ok"){
                    window.open("/home/", "_self");
                }else{
                    alert("Wrong username or password");
                }
            },
            error: function(xhr, errmsg, err){

            }
        });
    }
}

function logoutuser(){
    $.ajax({
        url: 'logoutuser/',
        type: 'POST',
        async: false,
        csrfmiddlewaretoken: "{{csrf_token}}",

        success: function(json){
            if(json.data == "ok"){
                window.open("/", "_self");
            }else{
                alert("Something went wrong!");
            }
        },
        error: function(xhr, errmsg, err){

        }
    });
}

var opened_resource = 0;

function open_boq(){
    var bid = document.getElementById("boqid").value;
    window.open("/show_excel_boq/"+bid, "_self");
}
