# Part 3

## Phonebook project (a Node app)

### What is this Node application used for?
The main functionality of this app is to CRUD phonebook entres.

### Technical details

#### frond-end 
	The frond-end was built with `create-react-app`, then `npm run build` creates a build directory with a production build of the it. This build directory was later served as a static file from the backend using a built-in middleware from express called static (e.g., `app.use(express.static('build'))`). 

#### back-end 
	For the back-end, we use Express framework to create a simple web server, and MongoDB to store the data. Data's insert and update validation was accomplished by using Mongoose's SchemaType. 

### Where to access this app?
The phonebook app has been deployed to heroku, you can visit it at: https://aqueous-castle-06916.herokuapp.com/



