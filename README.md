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

## HTTP  Overview

### Web Server
On the software side, a web server includes several parts that control how web users access hosted files.** At a minimum, this is an HTTP server**. An HTTP server is software that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages). 

### Proxy
1. What are proxies?
   
   Between the Web browser and the server, numerous computers and machines relay the HTTP messages. Due to the layered structure of the Web stack, most of these operate at the transport, network or physical levels, becoming transparent at the HTTP layer and potentially having a significant impact on performance. **Those operating at the application layers are generally called proxies. These can be transparent, forwarding on the requests they receive without altering them in any way, or non-transparent, in which case they will change the request in some way before passing it along to the server.**
2. What functions may proxies perform?
   - *caching* (the cache can be public or private, like the browser cache)
   - *filtering* (like an antivirus scan or parental controls)
	load balancing (to allow multiple servers to serve different requests)
   - *authentication* (to control access to different resources)
	logging (allowing the storage of historical information)

### HTTP is **stateless**
There is **no link between two requests** being successively carried out on the same connection. 

This immediately has the prospect of being problematic for users attempting to interact with certain pages coherently, for example, using e-commerce shopping baskets. 

But while the core of HTTP itself is stateless, **HTTP cookies allow the use of stateful sessions**. Using *header* extensibility, HTTP Cookies are added to the workflow, allowing session creation on each HTTP request to share the same context, or the same state.

### HTTP Cookie
1. What is an HTTP cookie?
   An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. The browser may store the cookie and send it back to the same server with later requests. 
2. Three main purposes of cookies?
   - Session management: Logins, shopping carts, game scores, or anything else the server should remember

   - Personalization: User preferences, themes, and other settings

   - Tracking: Recording and analyzing user behavior
3. Creating cookies
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
   
4. Other ways to store information in the browser

	Another approach to storing data in the browser is the Web Storage API.
	
	The `window.sessionStorage` and `window.localStorage` properties correspond to session and permanent cookies in duration, but have larger storage limits than cookies, and are never sent to a server. 
	
5. Caches V.s. Cookies

	<table><thead><tr><th>S.NO</th><th>Cache</th><th>Cookies</th></tr></thead><tbody><tr><td>1.</td><td>Cache is employed to store the web site content for the long run purpose.</td><td>While cookie is employed to store user choices.</td></tr><tr><td>2.</td><td>Cache’s website contents are stored in browser only.</td><td>While cookie’s contents are stored in both server and browser.</td></tr><tr><td>3.</td><td>It expires manually.</td><td>While it expires automatically.</td></tr><tr><td>4.</td><td>the types of cache are: Browser cache and proxy cache.</td><td>While the types of cookies are: Transient and persistent cookies.</td></tr><tr><td>5.</td><td>Cache stores the contents like html pages, images, JavaScript, CSS etc.</td><td>While cookie store the contents like browsing sessions and temporary tracking data.</td></tr><tr><td>6.</td><td>Cache does not send the response with requests.</td><td>While cookie sends the response with requests.</td></tr><tr><td>7.</td><td>In Cache, content of the website is save only on browser.</td><td>In Cookies, content of the website is save on both server and browser.</td></tr></tbody></table>


