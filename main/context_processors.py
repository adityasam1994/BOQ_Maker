from .models import master_db, boq, item, master_item, resource_category

def resource_pro(request):
    resources = master_db.objects.all()
    return {'resources': resources}

def mitem_pro(request):
    masters = master_item.objects.all()
    return{'masters':masters}

def boq_pro(request):
    boqs = boq.objects.all()
    return{'boqs':boqs}

def res_category(request):
    cat = resource_category.objects.all()
    return{'cats':cat}