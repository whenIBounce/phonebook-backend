- [Part 3](#part-3)
	- [The Phonebook project (a Node app)](#the-phonebook-project-a-node-app)
		- [What is this Node application used for?](#what-is-this-node-application-used-for)
		- [Technical details](#technical-details)
			- [frond-end](#frond-end)
			- [back-end](#back-end)
		- [Where to access this app?](#where-to-access-this-app)
	- [HTTP Cookies](#http-cookies)
		- [HTTP is **stateless**](#http-is-stateless)
		- [Creating cookies](#creating-cookies)
		- [Other ways to store information in the browser](#other-ways-to-store-information-in-the-browser)
	- [Cross-Origin Resource Sharing](#cross-origin-resource-sharing)
	- [Node.js](#nodejs)
		- [Differences between Node.js and the Browser](#differences-between-nodejs-and-the-browser)
		- [Express](#express)
			- [Why shall we uss Express?](#why-shall-we-uss-express)
			- [What is Express?](#what-is-express)
			- [What is Middleware?](#what-is-middleware)
				- [Definition: Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.](#definition-middleware-functions-are-functions-that-have-access-to-the-request-object-req-the-response-object-res-and-the-next-middleware-function-in-the-applications-request-response-cycle)
				- [Middleware functions can perform the following tasks:](#middleware-functions-can-perform-the-following-tasks)
				- [The next middleware function is commonly denoted by a variable named `next`. If `next` was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.](#the-next-middleware-function-is-commonly-denoted-by-a-variable-named-next-if-next-was-called-without-a-parameter-then-the-execution-would-simply-move-onto-the-next-route-or-middleware-if-the-next-function-is-called-with-a-parameter-then-the-execution-will-continue-to-the-error-handler-middleware)
			- [Middlewares We have used in Part 3](#middlewares-we-have-used-in-part-3)
	- [MongoDB and Mongoose](#mongodb-and-mongoose)
		- [MongoDB](#mongodb)
			- [collections](#collections)
			- [documents](#documents)
		- [Mongoose](#mongoose)
			- [Mongoose Schema](#mongoose-schema)
			- [Mongoose Models](#mongoose-models)
			- [SchemaType](#schematype)
			- [Validation](#validation)

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
	<p><strong>Warning:</strong> Browsers block frontend JavaScript code from accessing the <code>Set-Cookie</code> header, as required by the Fetch spec, which defines <code>Set-Cookie</code> as a <a href="https://fetch.spec.whatwg.org/#forbidden-response-header-name" class="external" rel=" noopener">forbidden response-header name</a> that <a href="https://fetch.spec.whatwg.org/#ref-for-forbidden-response-header-name%E2%91%A0" class="external" rel=" noopener">must be filtered out</a> from any response exposed to frontend code.</p>
### Other ways to store information in the browser

Another approach to storing data in the browser is the Web Storage API.
	
The `window.sessionStorage` and `window.localStorage` properties correspond to session and permanent cookies in duration, but have larger storage limits than cookies, and are never sent to a server. 

## Cross-Origin Resource Sharing

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. 

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser.

An Example:

<img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req.png" alt="CORS example">

## Node.js
**Node.js in not a framework, is not a library. It is a JavaScript's runtime enviroment.**

### Differences between Node.js and the Browser
Both the browser and Node.js use JavaScript as their programming language.

1. **In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies**. Those do not exist in Node.js, of course. You don't have the document, window and all the other objects that are provided by the browser. And in the browser, we don't have all the nice APIs that Node.js provides through its modules, like the filesystem access functionality.

2. **in Node.js you control the environment**. Unless you are building an open source application that anyone can deploy anywhere, you know which version of Node.js you will run the application on. Compared to the browser environment, where you don't get the luxury to choose what browser your visitors will use, this is very convenient.

3. Another difference is that **Node.js supports both the CommonJS and ES module systems**(since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented.

	In practice, this means that you can use both `require()` and `import` in Node.js, while you are limited to `import` in the browser.
### Express
#### Why shall we uss Express?
Implementing our server code directly with Node's built-in http web server is cumbersome. 

Express offers a more pleasing interface to work with the built-in http module. 

#### What is Express?
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
#### What is Middleware?
##### Definition: Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 

##### Middleware functions can perform the following tasks:
   - Execute any code.
   - Make changes to the request and the response objects.
   - End the request-response cycle.
   - Call the next middleware function in the stack.

##### The next middleware function is commonly denoted by a variable named `next`. If `next` was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.

#### Middlewares We have used in Part 3
```
app.use(express.json())
app.use(express.static('build'))
````
## Heroku
1. Deploy the app:
   When you create an app, a git remote (called heroku) is also created and associated with your local git repository.
	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku create phonebook</span>
	Creating phonebook... done, stack is heroku-18
	http://phonebook.herokuapp.com/ | https://git.heroku.com/phonebook.git
	Git remote heroku added
	</code></pre>
2. Define a Procfile

	Use a Procfile, a text file in the root directory of your application, to explicitly declare what command should be executed to start your app.

	The Procfile in the example app you deployed looks like this:
	```
	web: npm start
    ```
	This declares a single process type, web, and the command needed to run it. 
3. Scale the app
	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku ps</span>
	=== web (Free): `npm start`
	web.1: up 2014/04/25 16:26:38 (~ 1s ago)
	</code></pre>

	**Dyno**
	: All Heroku applications run in a collection of lightweight Linux containers called dynos

	Scaling an application on Heroku is equivalent to changing the number of **Dynos**() that are running.

4. Define config vars

	Heroku lets you externalize configuration - storing data such as encryption keys or external resource addresses in config vars.

	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku config:set TIMES=2</span>
	</code></pre>

	At runtime, config vars are exposed as environment variables to the application.
## MongoDB and Mongoose
### MongoDB

#### collections

MongoDB stores data records as documents (specifically BSON documents) which are gathered together in collections. A database stores one or more collections of documents.

#### documents
MongoDB stores data records as BSON documents. BSON is a binary representation of JSON documents, though it contains more data types than JSON.

Unlike JavaScript objects, the fields in a BSON document are ordered.

When comparing documents, field ordering is significant.

In addition to defining data records, MongoDB uses the document structure throughout, including but not limited to: query filters, update specifications documents, and index specification documents

### Mongoose

#### Mongoose Schema

Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
#### Mongoose Models
Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

#### SchemaType

You can think of a Mongoose schema as the configuration object for a Mongoose model. 

A SchemaType is then a configuration object for an individual property. 

A SchemaType says what type a given path should have, whether it has any getters/setters, and what values are valid for that path.

<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>) <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">SchemaType</span>; <span class="hljs-comment">// true</span>
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>) <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">Schema</span>.<span class="hljs-property">Types</span>.<span class="hljs-property">String</span>; <span class="hljs-comment">// true</span>
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>).<span class="hljs-property">instance</span>; <span class="hljs-comment">// 'String'</span>
</code></pre>

#### Validation

- Validation is defined in the SchemaType
- Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
- Mongose has several built-in validators, such as, all SchemaTypes have the built-in `required` validator
- How to create Custom Validators (including Async Custom Validators)?
  
  <p><strong>Warning:</strong>  When using <code>findOneAndUpdate</code> and related methods, mongoose doesn't automatically run validation. To trigger this, you need to pass a configuration object. For technical reasons, this plugin requires that you also set the <code>context</code> option to <code>query</code>.</p>

  <code>{ runValidators: true, context: 'query' }</code>

 

  