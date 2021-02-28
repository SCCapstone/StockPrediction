## Readme for stocks app

#### stocks has an api, but also has its own pages it renders, whereas accounts has pages but no api, and prediction has no pages but an api
#### becuase of that, /stocks/views.py is required, this allows us to render the respective html pages under templates
### it goes like this: url -> view -> template -> id/class -> React component -> api call in lookup -> React component -> html page
#### same stuff as normal, api views are in api folder

#### Probably some stuff that could be done with the serializer, we return the ticker every time, but its not necessary sometimes.
#### Definitely keeps it simple but could be optimized