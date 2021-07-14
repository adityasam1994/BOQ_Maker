from django.shortcuts import render, HttpResponse, HttpResponseRedirect, reverse
from .models import master_db, boq, master_item, master_item_edit, item, child_master
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def home(request):
    return render(request, 'home.html')

def create_boq(request):
    if request.method == "POST":
        name = request.POST.get("boqname")
        code = request.POST.get("boqcode")
        desc = request.POST.get("boqdesc")

        bo = boq()
        bo.name = name
        bo.code = code
        bo.description = desc
        bo.save()
        return HttpResponseRedirect(reverse('show_boq', args=(bo.id,)))
    else:
        return HttpResponseRedirect(reverse('home'))

# def show_boq(request, bid):
#     bo = boq.objects.get(id=bid)
#     mitems = master_item.objects.all()
#     return render(request, "show_boq.html", {'boqname':bo, 'mitems':mitems})

def show_boq(request, bid):
    bo = boq.objects.get(id=bid)
    return render(request, "edit_boq.html", {'boq':bo})

    # New Methods

# Method to load all the resources as a string

@csrf_exempt
def fetch_resources(request):
    resources = master_db.objects.all()
    big_data = ""
    for resource in resources:
        if big_data == "":
                       # Resource ID             Resource code               Resource Name              Resource Price
            big_data = str(resource.id) + ",," + str(resource.code) + ",," + str(resource.name) +",," + str(resource.price)
        else:
            big_data = big_data + "//" + str(resource.id) + ",," + str(resource.code) + ",," + str(resource.name) +",," + str(resource.price)

    response_data = {}
    response_data['big_data'] = big_data
    return HttpResponse(
        json.dumps(response_data),
        content_type="application/json"
    )

@csrf_exempt
def reload_masters(request):
    resources = master_item.objects.all()
    big_data = ""
    for resource in resources:
        if big_data == "":
                       # Resource ID             Resource code               Resource Name     
            big_data = str(resource.id) + ",," + str(resource.code) + ",," + str(resource.name)
        else:
            big_data = big_data + "//" + str(resource.id) + ",," + str(resource.code) + ",," + str(resource.name)

    response_data = {}
    response_data['big_data'] = big_data
    return HttpResponse(
        json.dumps(response_data),
        content_type="application/json"
    )

# Method to get the price of a perticular resource

@csrf_exempt
def get_resource_price(request):
    resource_id = request.POST.get("data")
    resource = master_db.objects.get(id = int(resource_id))
    price = resource.price

    response_data = {}
    response_data['price'] = price
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

# Saving the master from the modal

@csrf_exempt
def save_master(request):
    data = request.POST.get("data")

    split1 = data.split("___")
    mid = split1[0]
    code = split1[1]
    name = split1[2]
    remark = split1[3]
    resources = split1[4]

    master = master_item()
    if mid != "999999":
        master = master_item.objects.get(id=int(mid))
    master.code = code
    master.name = name
    master.remark = remark
    master.components = resources
    master.save()

    response_data = {}
    response_data['master_id'] = master.id
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )



# Saving the edited master from the modal

@csrf_exempt
def save_edit_master(request):
    data = request.POST.get("data")
    split1 = data.split("___")
    boq_id = split1[0]
    master_id = split1[1]
    code = split1[2]
    name = split1[3]
    remark = split1[4]
    resources = split1[5]

    master = master_item_edit.objects.filter(boq_id = int(boq_id), master_id = int(master_id))
    if len(master) == 0:
        master = master_item_edit()
    else:
        master = master[0]
    master.boq_id = boq_id
    master.master_id = master_id
    master.code = code
    master.name = name
    master.remark = remark
    master.components = resources
    master.save()

    response_data = {}
    response_data['master_id'] = master.id
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

# Load and send all the master items

@csrf_exempt
def load_options(request):
    master_items = master_item.objects.all()

    big_data = ""
    for item in master_items:
        if big_data == "":
            big_data = str(item.id) + "___" + str(item.code) + "___" + str(item.name) + "___" + str(item.remark)
        else:
            big_data = big_data + "//" + str(item.id) + "___" + str(item.code) + "___" + str(item.name) + "___" + str(item.remark)

    response_data = {}
    response_data['bigdata'] = big_data
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

# Method to calculate price of a master

def calculate_master_price(resources):
    ress = resources.split("//") # Splitting to individual resources
    total = 0
    for res in ress:
        res_split = res.split(",,") # Splitting to components
        total = total + float(res_split[-1])

    return total

# Getting price of the master element

@csrf_exempt
def get_master_price(request):
    master_id = request.POST.get("data").split("/")[1]
    boqid = request.POST.get("data").split("/")[0]

    master = master_item_edit.objects.filter(master_id = int(master_id), boq_id = int(boqid))
    if len(master) == 0:
        master = master_item.objects.get(id=int(master_id))
    else:
        master = master[0]

    response_data = {}
    response_data['price'] = calculate_master_price(master.components)
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

# Getting the details of master element to edit

@csrf_exempt
def get_master_details(request):
    master_id = request.POST.get("data").split("/")[1]
    boq_id = request.POST.get("data").split("/")[0]
    print(master_id)
    master = master_item_edit.objects.filter(boq_id = int(boq_id), master_id = int(master_id))
    if len(master) == 0:
        master = master_item.objects.get(id=int(master_id))
    else:
        master = master[0]
    data = master.code +"___" + master.name + "___" + master.remark + "___" + master.components

    response_data = {}
    response_data['data'] = data
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

# Getting master item detail for master page

@csrf_exempt
def get_master_details2(request):
    master_id = request.POST.get("data")
    master = master_item.objects.get(id = int(master_id))
    
    data = master.code +"___" + master.name + "___" + master.remark + "___" + master.components

    response_data = {}
    response_data['data'] = data
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

def clear_items(boqid):
    category = item.objects.filter(boq_id = boqid)
    item_ids = []
    l = len(category)
    for i in range(l):
        item_ids.append(category[i].id)
        category[i].delete()

    return item_ids

@csrf_exempt
def save_boq(request):
    data = request.POST.get("data")
    split1 = data.split(";;;;;")
    boqid = split1[0]
    factors = split1[1]
    base_data = split1[2]

    factors_split = factors.split("/")
    myboq = boq.objects.get(id = int(boqid))
    myboq.factor1 = factors_split[0]
    myboq.factor2 = factors_split[1]
    myboq.factor3 = factors_split[2]
    myboq.factor4 = factors_split[3]

    myboq.save()

    masters = base_data.split("--------")
    item_ids = clear_items(boqid)
    print(item_ids)

    for master in masters:
        master_split = master.split("_____")
        heading = master_split[0]
        dry = master_split[1]
        sell = master_split[2]
        itms = master_split[3]

        category = item()
        category.heading = heading
        category.boq_id = boqid
        category.dry_amount = dry
        category.sell_amount = sell

        category.save()

        itmssp = itms.split(">>>>>")
        for itm in itmssp:
            items_split = itm.split("........")
            value = items_split[0]
            quantity = items_split[1]
            uom = items_split[2]
            price = items_split[3]
            amount = items_split[4]
            fact = items_split[5]
            sprice = items_split[6]
            samount = items_split[7]
            remark = items_split[8]

            if value != "select":
                for it in item_ids:
                    childs = child_master.objects.filter(item_id = it)
                    l = len(childs)
                    for i in range(l):
                        childs[i].delete()

                childs = child_master()
                childs.item_id = category.id
                childs.master_id = value
                childs.quantity = quantity
                childs.uom = uom
                childs.price = price
                childs.amount = amount
                childs.factor = fact
                childs.sell_price = sprice
                childs.sell_amount = samount
                childs.remark = remark

                childs.save()

    response_data = {}
    response_data['data'] = 'test'
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

def edit_boq(request, bid):
    bo = boq.objects.get(id=bid)
    return render(request, "edit_boq.html", {'boq':bo})

@csrf_exempt
def load_blocks(request):
    bid = request.POST.get("data")
    myitems = item.objects.filter(boq_id = int(bid))
    data = ""
    for it in myitems:
        if data == "":
            data = str(it.heading) + "/////" + str(it.dry_amount) + "/////" + str(it.sell_amount) + "/////" + str(it.id)
        else:
            data = data + ">>>>>" + str(it.heading) + "/////" + str(it.dry_amount) + "/////" + str(it.sell_amount) + "/////" + str(it.id)
    
    response_data = {}
    response_data['data'] = data
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

@csrf_exempt
def get_masters(request):
    data = request.POST.get("data")
    bid = data.split("/")[0]
    item_id = data.split("/")[1]

    masters = child_master.objects.filter(item_id = int(item_id))
    bigdata = ""
    for master in masters:
        if bigdata == "":
            bigdata = str(master.master_id) + "/////" + str(master.quantity) + "/////" + str(master.price) + "/////" + str(master.amount) + \
            "/////" + str(master.sell_price) + "/////" + str(master.sell_amount) + "/////" + str(master.remark) + "/////" + str(master.factor) + "/////" + str(master.uom)

        else:
            bigdata = bigdata + ">>>>>" + str(master.master_id) + "/////" + str(master.quantity) + "/////" + str(master.price) + "/////" + str(master.amount) + \
            "/////" + str(master.sell_price) + "/////" + str(master.sell_amount) + "/////" + str(master.remark) + "/////" + str(master.factor) + "/////" + str(master.uom)

    response_data = {}
    response_data['data'] = bigdata
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )


def all_resources(request):
    return render(request, "resources.html")

@csrf_exempt
def update_resource(request):
    alldata = request.POST.get('data')
    data_split = alldata.split("/////")
    res = master_db.objects.get(id = int(data_split[0]))
    
    res.code = data_split[1]
    res.name = data_split[2]
    res.price = (data_split[3])
    res.save()

    response_data = {}
    response_data['data'] = 'test'
    return HttpResponse(
        json.dumps(response_data),
        content_type = "application/json"
    )

def all_masters(request):
    return render(request, "masters.html")