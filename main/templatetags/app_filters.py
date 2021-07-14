from django import template
from django.template.defaultfilters import stringfilter
from django.shortcuts import HttpResponse
register = template.Library()


@register.filter(name='getprice')
@stringfilter
def splitname(items):
    from main.models import master_db

    sp = items.split("/")
    d = 0
    for s in sp:
        it = master_db.objects.get(id=int(s)).price
        d = d+it

    return d

@register.filter(name='cal_amount')
@stringfilter
def cal_amount(comps):
    from main.models import master_db
    sp = comps.split("//")
    tot=0
    for s in sp:
        sp2 = s.split(",,")
        res = master_db.objects.filter(id = int(sp2[0]))
        if len(res) > 0:
            tot = tot + (res[0].price)*float(sp2[1])

    return "{:,}".format(round(tot,2))

@register.filter(name='comma_sep')
@stringfilter
def comma_sep(data):
    return "{:,}".format(float(data))

@register.filter(name='get_boq_name_excel')
@stringfilter
def get_boq_name_excel(data):
    from main.models import boq, excel_boq_data
    ex = excel_boq_data.objects.get(id = int(data))
    bq = boq.objects.get(id = int(ex.boq_id))
    return bq.name

@register.filter(name='get_boq_excel_data')
@stringfilter
def get_boq_excel_data(data):
    from main.models import boq, excel_boq_data
    ex = excel_boq_data.objects.get(id = int(data))
    return ex.data

@register.filter(name='times') 
def times(number):
    return range(number)