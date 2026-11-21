# Carta para Kiara 💌

Página con Django. Todo el contenido se cambia desde el admin: la carta, la canción, las fotos, los videos y las frases.

## Probar en tu compu

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Página: http://127.0.0.1:8000 · Admin: http://127.0.0.1:8000/admin

## Publicar gratis en PythonAnywhere

Cambia `USUARIO` por tu usuario de PythonAnywhere en todos los pasos.

1. Crea una cuenta gratis ("Beginner") en https://www.pythonanywhere.com
2. Abre **Consoles → Bash** y pega esto línea por línea. El repo es privado: cuando pida contraseña, usa un token de GitHub (GitHub → Settings → Developer settings → Personal access tokens → Fine-grained, con permiso de lectura de Contents en este repo).
   ```bash
   git clone -b claude/bold-edison-tcgux1 https://github.com/DavidFH951/anivers.git
   cd anivers
   mkvirtualenv --python=python3.13 anivers
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic --noinput
   python manage.py createsuperuser
   ```
   El `createsuperuser` te pide el usuario y la contraseña con los que entrarás al admin.
3. Ve a la pestaña **Web → Add a new web app → Manual configuration → Python 3.13**.
4. En esa página:
   - **Virtualenv:** `/home/USUARIO/.virtualenvs/anivers`
   - **WSGI configuration file:** ábrelo, borra todo y pega esto (inventa tu propia frase larga en la clave secreta):
     ```python
     import os, sys
     path = '/home/USUARIO/anivers'
     if path not in sys.path:
         sys.path.insert(0, path)
     os.environ['DJANGO_SECRET_KEY'] = 'inventa-aqui-una-frase-larga-y-secreta-123'
     os.environ['DJANGO_SETTINGS_MODULE'] = 'anivers.settings'
     from django.core.wsgi import get_wsgi_application
     application = get_wsgi_application()
     ```
   - **Static files**, agrega dos filas:
     | URL | Directory |
     |---|---|
     | `/static/` | `/home/USUARIO/anivers/staticfiles` |
     | `/media/` | `/home/USUARIO/anivers/media` |
5. Dale al botón verde **Reload**.

Listo:
- Link para tu novia: `https://USUARIO.pythonanywhere.com`
- Tu admin: `https://USUARIO.pythonanywhere.com/admin`

**Ojo:** la cuenta gratis tiene 512 MB de espacio (cuidado con videos pesados) y cada 3 meses tienes que entrar a la pestaña **Web** y darle a "Run until 3 months from today" para que no se apague.
