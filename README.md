<h1>A Node.js app that ports the AngularJS <a href='http://angularjs.org/#mongolab-js' target='_blank'>ProjectsList</a>  app to use CF/local MongoDB backend(instead of Mongolab)</h1>

<p align="center">
<span style='align:left'> <img src="https://raw.github.com/rajaraodv/mongoProjectsList/master/appImg0.png" height="250px" width="350px" /></span><span style='align:left'> 
<img src="https://raw.github.com/rajaraodv/mongoProjectsList/master/appImg1.png" height="250px" width="350px" /></span>
</p>

#### Running it locally ####
* Make sure you have Node.js & MongoDB running.
* Clone the app to `mongoProjectsList` folder
* `cd mongoProjectsList` folder
* `npm install`
* `node app.js`
* open browser at `localhost:3000`


#### Running it on Cloud Foundry ####

* Clone the app to `mongoProjectsList` folder
* `cd mongoProjectsList` folder
* `npm install`

```
> vmc push mongoProjectsList
Instances> 1

1: node
2: other
Framework> node  <---- Select Node.js framework

1: node
2: node06
3: node08
4: other
Runtime> 3  <---- Select Node.js 0.8v of runtime

1: 64M
2: 128M
3: 256M
4: 512M
Memory Limit> 64M <----- 64MB memory

Creating mongoProjectsList... OK

1: mongoProjectsList.cloudfoundry.com
2: none
URL> mongoProjectsList.cloudfoundry.com   <---------This will be the url of your app

Updating mongoProjectsList... OK

Create services for application?> y

1: blob 0.51
2: mongodb 2.0
3: mysql 5.1
4: postgresql 9.0
5: rabbitmq 2.4
6: redis 2.4
7: redis 2.2
8: redis 2.6
What kind?> 2      <--------------- Select & add MongoDB service

Name?> mongodb-ccc0e <-- Just a name of the MongoDB service

Creating service mongodb-ccc0e... OK
Binding mongodb-ccc0e to mongoProjectsList... OK
Create another service?> n

Bind other services to application?> n

Save configuration?> n

Uploading mongoProjectsList... OK
Starting mongoProjectsList... OK
Checking mongoProjectsList... OK
```

### Notes ###
* The app runs both locally and on Cloud Foundry w/o any changes to it.
* Check out Cloud Foundry getting started <a href='http://docs.cloudfoundry.com/getting-started.html' target='_blank'>here</a>
* Install latest vmc tool by running `sudo gem install vmc ---pre`


### Credits ###
 * Front-end is from <a href='http://angularjs.org/#mongolab-js' target='_blank'>AngularJS ProjectsList app</a>

### Copyright ###
 VMware

