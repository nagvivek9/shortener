# shortener
The application that can shorten the given URL

# Instructions to run the application

1. You need to configure the database creadentials in config.js
2. You need to build the web app (forntend). For this, Navigate to htdocs/ui-shortener and then
   run the command : npm run build. It will build the react app
3. Then in the root folder run the command: npm start. It will start the node application.
4. You can test the APIs using command: npm run test. These tests are implemented on Mocha and chai package.



# Known issues/bugs and thought on improving
1. As we did not introduced `cluster` module to run the multiple instances of this app and restarting them on failure, If the server crash, then it will stop running and we need to start it manually again. we can overcome this by introducing clusters and forkers.

2. Maybe we can make use of existing npm package shortid to generate random.
3. We can improve the handling of the roots for `/stats` and `/<shorten-code>`.
4. In my trails IP is filling with value 1 because of I tried on localhost.

Here is the MySql query to create the table structure

CREATE TABLE `shorten` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `original` varchar(100) NOT NULL,
  `shorten` varchar(5) NOT NULL,
  `clicks` int(10) NOT NULL DEFAULT '0',
  `ip` varchar(50) DEFAULT '0',
  `ua` varchar(50) DEFAULT '0',
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
