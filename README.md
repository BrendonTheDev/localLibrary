# A data-driven application for a local library created using Node.js and MongoDb.

## How the appication works and what I learned. 

The project is organized via MVC architecture.

I created models to define the data being stored in the database. "MondoDB Atlas"

I created routed and controller functions that performed CRUD operations inresponse to user input.

Form input is validated and sanitized before the operations are performed - data is then
either created, updated, deleted, and/or rendered via pug template views. 
