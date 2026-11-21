from django.test import TestCase

from .models import Carta, Frase


class PaginaTests(TestCase):
    def test_muestra_contenido_cargado(self):
        r = self.client.get('/')
        self.assertContains(r, 'Mi Querida Kiara')
        self.assertContains(r, 'fotos/foto1.jpeg')
        self.assertContains(r, 'Eres mi lugar favorito')
        self.assertContains(r, 'style="--i:3"')  # 4 párrafos separados

    def test_frase_nueva_aparece(self):
        Frase.objects.create(texto='Frase nueva de prueba')
        self.assertContains(self.client.get('/'), 'Frase nueva de prueba')

    def test_funciona_sin_carta(self):
        Carta.objects.all().delete()
        self.assertEqual(self.client.get('/').status_code, 200)

    def test_admin_pide_login(self):
        self.assertRedirects(self.client.get('/admin/carta/frase/'), '/admin/login/?next=/admin/carta/frase/')
