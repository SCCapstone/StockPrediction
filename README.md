# Stock Prediction

The Stock Prediction web app is a Django web app where users can track stock market prices and receive esimated prices based off of a TensorFlow Neural Network.

[READ MORE](https://github.com/SCCapstone/StockPrediction/wiki/Project-Description)

## External Requirements

At this moment we do not have a complete list of the necessary APIs and Libraries. We will add one as soon as possible. Here are the ones we have at the moment.
*CURRENTLY USED:
* React.js
* Django Rest Framework (pip install djangorestframework)
* Cors Headers (pip install django-cors-headers)
* Stock Prices API: [Finnhub.io](https://finnhub.io/docs/api)
* Historical data: investpy
* Neural network: keras functional API
* NOT USED:
* Google Trends API: [pytrends](https://pypi.org/project/pytrends/)
* Task Management: [Celery](https://docs.celeryproject.org/en/stable/index.html)
* Message Broker [RabbitMQ](https://www.rabbitmq.com/documentation.html)

## Setup

First you will need to install RabbitMQ. This is the message broker that we use to schedule tasks. [Download](https://www.rabbitmq.com/download.html).

Additionally, you'll need to get an API key from Finnhub.io. [Key](https://finnhub.io/).

Then, navigate to the root directory of the project. And run:

`pipenv install`

This will install all of the required Python modules.

## Running

`manage.py runserver`

# Deployment

Webapps need a deployment section that explains how to get it deployed on the 
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**. 

# Testing

Running tests:

`./manage.py test`

Location of tests:

`./stocks/tests.py`

## Testing Technology

TBD.

## Running Tests

In due time.

# Authors

Aaron B.: abarge@email.sc.edu

Miles Z.: mziemer@email.sc.edu

Max C.: mcorbel@email.sc.edu

Zane H.: ahmedh@email.sc.edu

Jiabei He: jiabei@email.sc.edu
