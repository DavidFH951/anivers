from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from carta.views import inicio

admin.site.site_header = 'Administrar la carta 💌'
admin.site.site_title = 'Carta'
admin.site.index_title = 'Contenido'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', inicio, name='inicio'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # solo sirve en tu compu; en el servidor lo hace PythonAnywhere
