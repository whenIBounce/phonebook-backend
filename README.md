# Part 3

## The Phonebook project (a Node app)

### What is this Node application used for?
The main functionality of this app is to CRUD phonebook entres.

### Technical details

#### frond-end 
The frond-end was built with `create-react-app`, then `npm run build` creates a build directory with a production build of the it. This build directory was later served as a static file from the backend using a built-in middleware from express called static (e.g., `app.use(express.static('build'))`). 

#### back-end 
For the back-end, we use Express framework to create a simple web server, and MongoDB to store the data. Data's insert and update validation was accomplished by using Mongoose's SchemaType. 

### Where to access this app?
The phonebook app has been deployed to heroku, you can visit it at: https://aqueous-castle-06916.herokuapp.com/

## HTTP Cookies
### HTTP is **stateless**
There is **no link between two requests** being successively carried out on the same connection. 

This immediately has the prospect of being problematic for users attempting to interact with certain pages coherently, for example, using e-commerce shopping baskets. 

But while the core of HTTP itself is stateless, **HTTP cookies allow the use of stateful sessions**. 

Using *header* extensibility, HTTP Cookies are added to the workflow, allowing session creation on each HTTP request to share the same context, or the same state.
### Creating cookies
- After receiving an HTTP request, a server can send one or more `Set-Cookie` headers with the response. 
			
	```
	HTTP/2.0 200 OK
	Content-Type: text/html
	Set-Cookie: yummy_cookie=choco;Expires=Wed, 21 Oct 2023 07:28:00 GMT
	Set-Cookie: tasty_cookie=strawberry; Max-Age=1000000

	[page content]
	```

- The browser usually stores the cookie and sends it with requests made to the same server inside a `Cookie` HTTP header. 
	```
	GET /sample_page.html HTTP/2.0
	Host: www.example.org
	Cookie: yummy_cookie=choco; tasty_cookie=strawberry
	```
   
### Other ways to store information in the browser

Another approach to storing data in the browser is the Web Storage API.
	
The `window.sessionStorage` and `window.localStorage` properties correspond to session and permanent cookies in duration, but have larger storage limits than cookies, and are never sent to a server. 

## Cross-Origin Resource Sharing

<img src="/en-US/docs/Web/HTTP/CORS/simple-req.png" alt="CORS example">




