from django.contrib import admin
from django.utils.html import format_html

from .models import Carta, Foto, Frase, Video


@admin.register(Carta)
class CartaAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not Carta.objects.exists()  # solo hay una carta

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Foto)
class FotoAdmin(admin.ModelAdmin):
    list_display = ['miniatura', 'texto', 'orden']
    list_editable = ['texto', 'orden']

    @admin.display(description='Vista previa')
    def miniatura(self, obj):
        return format_html('<img src="{}" style="height:70px;border-radius:4px">', obj.imagen.url)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'orden']
    list_editable = ['orden']


@admin.register(Frase)
class FraseAdmin(admin.ModelAdmin):
    list_display = ['texto', 'orden']
    list_editable = ['orden']
