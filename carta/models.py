from django.core.validators import FileExtensionValidator
from django.db import models


class Carta(models.Model):
    para = models.CharField('Para', max_length=60, default='Kiara')
    saludo = models.CharField('Saludo', max_length=80, default='Mi amor,')
    texto = models.TextField('Texto de la carta', help_text='Deja una línea en blanco entre párrafos.')
    firma = models.CharField('Firma', max_length=60, default='Alonso')
    cancion = models.FileField(
        'Canción', upload_to='musica/', blank=True,
        validators=[FileExtensionValidator(['mp3', 'm4a', 'ogg', 'wav'])])
    nombre_cancion = models.CharField('Texto bajo el disco', max_length=100, default='La canción que me recuerda a ti')

    class Meta:
        verbose_name = 'carta'
        verbose_name_plural = 'carta'

    def __str__(self):
        return f'Carta para {self.para}'

    def parrafos(self):
        return [p.strip() for p in self.texto.replace('\r\n', '\n').split('\n\n') if p.strip()]


class Foto(models.Model):
    imagen = models.ImageField('Foto', upload_to='fotos/')
    texto = models.CharField('Texto debajo', max_length=80, blank=True)
    orden = models.PositiveIntegerField('Orden', default=0)

    class Meta:
        ordering = ['orden', 'id']

    def __str__(self):
        return self.texto or f'Foto {self.pk}'


class Video(models.Model):
    archivo = models.FileField(
        'Video', upload_to='videos/',
        validators=[FileExtensionValidator(['mp4', 'webm', 'mov'])])
    titulo = models.CharField('Título', max_length=80, blank=True)
    orden = models.PositiveIntegerField('Orden', default=0)

    class Meta:
        ordering = ['orden', 'id']

    def __str__(self):
        return self.titulo or f'Video {self.pk}'


class Frase(models.Model):
    texto = models.CharField('Frase', max_length=200)
    orden = models.PositiveIntegerField('Orden', default=0)

    class Meta:
        ordering = ['orden', 'id']

    def __str__(self):
        return self.texto
