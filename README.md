# Parking App

Fullstack Code Challenge

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
sudo apt install nodejs npm
sudo npm install -g @angular/cli
sudo apt-get install python3-pip
sudo pip3 install virtualenv
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install development tools

```
virtualenv venv
pip install -r requirements.txt
npm install
```

Then run development servers

```
python manage.py runserver 8080
ng serve --watch
```

You should be able to open the app at localhost:4200


## Deployment

Ask for permission first to gonzasestopal@gmail.com

```
sudo ssh -i apli.pem ubuntu@ec2-52-14-210-85.us-east-2.compute.amazonaws.com
cd apli/
git pull
cd apli/client/
ng build --prod
sudo systemctl gunicorn restart
sudo systemctl nginx restart
```

## Built With

* [Angular](https://angular.io/) - Frontend Framework
* [Django](https://www.djangoproject.com/) - API

## Contributing

Please read fork or submit puull request.

## Versioning

No current version.

## Authors

* **Gonza Sestopal** - *Initial work* - [gonzasestopal](https://github.com/gonzasestopal)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc