from django.contrib import admin
from .models import master_db, boq, item, master_item, master_item_edit, child_master, myuser, excel_boq_data, resource_category
from import_export.admin import ImportExportModelAdmin

# Register your models here.

class myuseradmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display=['username']

admin.site.register(myuser, myuseradmin)

class MasterAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display=['code','name','price']
    search_fields = ['name', 'code']

admin.site.register(master_db,MasterAdmin)

class boqAdmin(admin.ModelAdmin):
    list_display=['name']

admin.site.register(boq,boqAdmin)

class itemAdmin(admin.ModelAdmin):
    list_display=['heading', 'boq_id']

admin.site.register(item,itemAdmin)

class childMasterAdmin(admin.ModelAdmin):
    list_display=['item_id', 'master_id']

admin.site.register(child_master,childMasterAdmin)

class mitemAdmin(admin.ModelAdmin):
    list_display=['code','name']
    search_fields = ['name', 'code']

admin.site.register(master_item,mitemAdmin)

class mitemeditAdmin(admin.ModelAdmin):
    list_display=['boq_id','code','name']

admin.site.register(master_item_edit,mitemeditAdmin)

class excelboqAdmin(admin.ModelAdmin):
    list_display=['boq_id']

admin.site.register(excel_boq_data,excelboqAdmin)

class rcategoryAdmin(admin.ModelAdmin):
    list_display=['category_value', 'category_name']

admin.site.register(resource_category,rcategoryAdmin)