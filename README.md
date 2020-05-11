# FIND MY PLACE

Find my Place is a JS Vanilla App, build as a challenge for an opportunity.

Live Demo: https://lribeiromoura.github.io/FindMyPlace/
Figma: https://www.figma.com/file/8dg4TRZpIpWOxy87FeDNAt/FindMyPlace?node-id=0%3A1

## Installation

1. Download the entire project.
2. Change the double mustache and the entire text to your API KEY from google maps in two places:
    
    2.1 Line 35 in index.html:

            <script src="https://maps.googleapis.com/maps/api/js?key={{ YOUR_KEY_HERE }}&libraries=places&callback=initMap" async defer></script>

    2.2 Line 1 in main.js

        var apiKey = '{{YOUR_KEY_HERE}}';

3. Just run index.html

## License
[MIT](https://choosealicense.com/licenses/mit/)