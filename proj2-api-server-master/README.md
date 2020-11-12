###Yelp Recommendation Service

Provide 6 API's for Restaurants and P2P:

    1. Restaurants API:
        （i）search by ID
        (ii) search by term, location, price, latitude and longitude
    2. P2P API:
        support get,save,delete and deleteAll

To use API, please follow the API-doc.txt.

How to use:

1. First, you need to install JDK 1.8, Tomcat latest version, Maven latest version;

2. In the Yelp Recommendation Service directory, run command
    
        mvn clean package -Dmaven.test.skip=true         

    This will create a .war file in the target folder.

3. Go to Tomcat directory, cd to webapps folder, delete ROOT.war and ROOT folder. 
Then copy the war file to the webapps folder and rename it as ROOT.war.

4. Start Tomcat by running 

            ./YOUR_TOMCAT_DIRECTORY/bin/startup.sh
