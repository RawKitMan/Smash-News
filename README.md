# Smash-News

Welcome to Smash News, the one-stop-shop for all news in regards to Super Smash Brothers....from Kotaku. This site scrapes articles from https://kotaku.com/tag/smash-bros by clicking the Scrape articles button at the top, stores them in a Mongoose Collection, and then displays them on the page via Handlebars. 

Each displayed article provides a link to the actual article, the ability to save or delete the article from the page, and add a note/comment for a specific article. Each note is stored in it's own Mongoose Collection with its unique ID stored in the associated Article document. The user can also update the comment.

Things to improve on:

- Add images to each article. The images associated with the articles I'm scraping are lazy loaded, which makes it very difficult, if not impossible, to scrape. I need to research into how I can pull this off.

- Set up the notes text boxes through Handlebars rather than using front end Javascript

Technology utilized: Express, Handlebars, Mongoose, Morgan (to track database requests), Javascript/jQuery, Bootstrap, Cheerio, Axios

Before scraping:

![Screenshot (29)](https://user-images.githubusercontent.com/41662298/55498471-931e5600-55f8-11e9-869d-b1f441cb1617.png)


After scraping:


![Screenshot (30)](https://user-images.githubusercontent.com/41662298/55498474-9580b000-55f8-11e9-8fc9-b23ca4c21294.png)

Adding notes to a specific article (can be pulled up and changed after if the article is saved):


![Screenshot (31)](https://user-images.githubusercontent.com/41662298/55498484-974a7380-55f8-11e9-8062-1079a6db0899.png)


Saved article only:


![Screenshot (32)](https://user-images.githubusercontent.com/41662298/55498498-9dd8eb00-55f8-11e9-83bd-70e2d60b8c9e.png)



App URL: https://ancient-gorge-41927.herokuapp.com/

