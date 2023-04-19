# RMWLL-Website
This project can be viewed at https://rocky-mountain-womens-lacrosse-league.netlify.app/

## About
This website utilizes both Bootstrap and SCSS to create a visually stunning and responsive interface. The Teams page features a dynamic table that enables sorting and filtering of all columns. Additionally, users can add, update, and delete teams using this functionality.

## Technical Architecture
The backend of this system is configured using Express and MySQL for the database. The front-end utilizes JavaScript for routing, models, and controllers. The system offers two storage options: local storage, which stores data in the browser, and a REST storage service that uses the Fetch API to retrieve data from the backend. To create the webpage's view, EJS is used to generate wrapper views and children views that are displayed on the page. The controller loads the appropriate view based on the route specified.
