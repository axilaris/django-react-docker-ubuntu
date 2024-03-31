# React/DjangoRF Authentication App

Authentication app using React and Django REST framework with session authentication.

## Installations


* Django
```
cd backend <-- to to this directory
backend> python3 -m venv backendvirtualenv && source backendvirtualenv/bin/activate
backend> pip install -r requirements.txt
backend> python manage.py makemigrations
backend> python manage.py migrate
backend> python manage.py runserver
```

* React
```
cd frontend <-- to to this directory
frontend> npm install
frontend> npm run build
frontend> npm start
```