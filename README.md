#Travelog


##Technologies Used

- Ruby on Rails
    * Mainly used for the API containing our users, articles, and comments. Rendering a login page and redirecting to the main angular page.
- ActiveRecord
    * Accessing the database to fetch, update, delete and add information to the database.
    *
- Angular
    * Renders the main content of the app. Where articles are viewed and commented on. ngRoutes was used to redirect to a create articles page.
- Jbuilder
    * Used to build JSON files for the API.
- Google Maps API
    * Render markers of the places users have been to. Also the search will populate the new article form with latitude, longitude, and name of the location of your choosing.
- HTML
- CSS
- JavaScript & jQuery


##Approach Taken

The Ruby application was built first followed by the creation of the models (users, articles, and comments). All CRUD functionality was originally done in Rails with ERB pages. After the controllers were funtional we began to build jbuilder JSON files in preperation for Angularjs pages. Basic controllers for angular were built in the angular.js file. After successfully rendering our articles we started to build routes with Angularjs ngRoutes. Getting the Google Maps API to work was the following challenge and then we styled the app.

##Links
[Project 3 Heroku link](https://secure-depths-2496.herokuapp.com)

##Features We Would Like To Add

- Link in markers that takes you to the article it belongs to.
- Limit articles view to 10 and have next and previous buttons to navigate entries.
- Search feature.
