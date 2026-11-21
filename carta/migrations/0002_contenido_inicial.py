from django.db import migrations

CARTA = """Mi Querida Kiara, se que no te escribo de hace tiempo una carta y queria aprovechar esta ocacion para hacerte no solo una carta a papel, si no, una carta de la mejor manera que se hacer ❤️

Tu eres una chica que le da un proposito mas a mi vida, gracias por estar siempre conmigo, en las buenas, en las malas, en nuestras malas rachas y en los momentos hermosos que tenemos juntos

Quiero decirte que eres la novia perfecta a mis ojos y no te cambiaria jamas por otra, no necesito ni imaginarlo porque lo que tengo ahora contigo, es lo mas hermoso y lo que siempre busque en alguien, gracias por aceptar alguien como yo, graciass por estar siempre conmigo

Te amo con todo mi corazon y eso jamas va a cambiar, FELIZ DIA mi AMOR, a ti por ser la novia que tanto desee y por seguir siendo la persona que me enamore ❤️"""

FOTOS = [
    'Nuestro paseo al Parque de las Leyendas💖',
    'Los envidiosos diran que es IA✨',
    'Cita en el cine para ver al Rey del POP 🌟',
    'Risas y momentos locos ✨',
    'Paseo en San Borja🌟',
    'Hermosa mi novia en Pucallpa ✨',
    'Momentos inolvidables en la biblioteca💖',
    'Nuestros domingos juntos❤️',
    'Esta foto sigue siendo mi favorita❤️',
    'Metas a futuro mi amor❤️❤️',
]

FRASES = [
    'Eres mi lugar favorito en el mundo ❤️',
    'Contigo hasta el infinito y más allá ✨',
    'Cada día a tu lado es mi día favorito 💖',
    'Te elegiría una y mil veces más 💍',
    'Mi corazón es tuyo, Kiara 💘',
    'Gracias por existir y por quedarte conmigo 🌹',
]


def cargar(apps, schema_editor):
    apps.get_model('carta', 'Carta').objects.create(texto=CARTA)
    Foto = apps.get_model('carta', 'Foto')
    for i, texto in enumerate(FOTOS, 1):
        Foto.objects.create(imagen=f'fotos/foto{i}.jpeg', texto=texto, orden=i)
    Frase = apps.get_model('carta', 'Frase')
    for i, texto in enumerate(FRASES, 1):
        Frase.objects.create(texto=texto, orden=i)


class Migration(migrations.Migration):
    dependencies = [('carta', '0001_inicial')]
    operations = [migrations.RunPython(cargar, migrations.RunPython.noop)]
