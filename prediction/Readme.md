## Readme for prediction app

### Relevant files

* api/views.py - recieves/sends data back to React 
* api/urls.py - serves as endpoints for React, referenced in main app urls
* models.py - contains Prediction model
* serializers.py - contains serializer for Prediction model

### Prediction app does not have anything to render, is only used for api calls

#### analysis.py is in here currently to easily test getting a prediction.
#### all it does is return a random number