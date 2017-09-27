# Repertoire README

Link to back end README: https://github.com/Aaron-Vale/repertoire-back-end
Link to front end application: https://aaron-vale.github.io/repertoire/
Link to back end application: https://av-repertoire.herokuapp.com/

### Overview

Repertoire is a single-page web application for musicians to create and save a digitized version of their repertoire. Users, once they sign up for an account and log in, can begin adding songs to their repertoire. User information is saved and stored in a database via a back end Ruby on Rails application. In addition to creating, editing and deleting songs from their repertoire, users can search the songs in the iTunes Music Store and add those songs to their repertoire.

### Technologies Used

HTML 5, CSS 3, SASS, JavaScript ES6, jQuery, Handlebars, AJAX

## Development Process

Original Project Wireframe: https://flic.kr/p/YyzVxm
Original user stories:
  - As a user, I can sign up, log in and log out, and have my data persist.
  - As a user, I can enter and update information about the instruments that I play, and the pieces I have learned.
  - As a user, I can create a list of pieces that I want to learn in the future.

I originally planned to design my front end to meet the capabilities of my back end, but quickly realized that for this project it would be better to focus on designing the back end to meet the specifications of my user stories. It was with the user stories in mind that my project evolved from its original wireframe and scope.

After creating a basic wireframe of my login and app views with HTML and CSS, I began to implement user authorization actions. Once a user could sign up, log in, log out, and change password, I began to think about how a user should be able to view, edit, and send song data to my API. I decided that it would be the best user experience to view all information about their entire repertoire at once (song names, composers, and instruments).

After making this decision, I designed a display table to show all of the information, and added a create song form to send the information to my API. When the browser receives the JSON response, it utilizes a Handlebars template to display the song information in the table.

The same Handlebars template creates edit and delete song buttons for each song in the table. Again, with the user experience in mind, I kept all edit and delete song functionality within the table, allowing users to directly type in their edits and confirm their changes before sending the information to the API.

At this point, I noticed that it was a little difficult to find a song in their repertoire, as their most recent changes would display at the bottom of the table. I decided to add an additional user story; As a user, I can order my repertoire by song name, composer, or instrument, and have the results display alphabetically. I then made a tweak to my back end, allowing an additional paramater for table display order to be passed in to the get all songs request.

Finally, I wanted a user to be able to look up a song on an external database, and add that song to their repertoire. I originally wanted to implement the Spotify API, but I discovered that it required user authentication with Spotify, which would temporarily take the user away from Repertoire, and would also require the user to have a Spotify account. Using Apple's iTunes API instead, I was able to implement a simple search function from my application, which perfectly met the needs for my user stories.

### Future Additions

One feature I am considering implementing is adding the ability to view another user's repertoire, and adding social media integration.
