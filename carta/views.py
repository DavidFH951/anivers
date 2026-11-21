from django.shortcuts import render

from .models import Carta, Foto, Frase, Video


def inicio(request):
    return render(request, 'carta/index.html', {
        'carta': Carta.objects.first() or Carta(texto='Escribe tu carta desde el admin.'),
        'fotos': Foto.objects.all(),
        'videos': Video.objects.all(),
        'frases': Frase.objects.all(),
    })
