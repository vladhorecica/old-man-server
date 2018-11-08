# Oldman Server App
Server-side application used for an internal roadmap in order to learn more about frontend development.
You can follow the changes [here](CHANGELOG.md).
##

### Instalation
* Via `Makefile` simply run
```
 	make install 
```

* Via `npm` run the following commands

```
	npm install
	cp config.js.dist config.js
```

_Note: make sure you already have `node` and `npm` installed on your environment_
##

### Start application
* Via `node` run

```
	node server.js
```

* Via `nodemon`

Install `nodemon` globally

```
	npm i nodemon -g
```

Run command

```
	nodemon server.js
```

##

### Run tests
In order to run all the tests and code quality tools run

```
	make tests
```

##

### Authors
* **Vlad Horecica** - starring as the `apprentice`
* **Alexandru Batrinu** - starring as the `wiseman`

##
In order to help us improve this application, please donate to our [Patreon account](https://media1.giphy.com/media/7zAPZThZ0etKYviH7j/giphy.gif?cid=3640f6095bc6dc77644b716255d2a5e0).
