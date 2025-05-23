# Rondo Commemorative Plaza Brick Road Site

This site was built by Jonah Zimmer, overseen by Katie Frye and Professor Getiria Onsongo.

## Running the site locally:

Run `npm i` to install relevant packages. You can use `npm run build` or `npm run dev` to compile one change or ongoing changes, respectively. Then you can see the site by creating a local server and navigating to the site. VS Code's built in "live server" is my recommendation.

## Directory layout:

This site is built with React. The root directory contains the base HTML file.

### Styles

Due to some limitations with the bundler I chose, browserify, I was having difficulty importing css files into js files, so I imported them directly to the html file through the file 'styles.css'. You will see in that file that it only contains imports. Each of the css files is in the directory **/styles**, and organized by different components of the site.

### Components

The sub directory **/pages** contains all of the components. It is broken up into the two pages: about and bricks.

### About

This folder is pretty straightforward. There are the images on the about page and the file that contains all of the components on the page.

### Bricks

This folder contains the components of the bricks in both the scrolling and the list view. Within this folder there are three files and two folders. The first file, search.js, is the search component that is used on both view forms of the bricks page. The json file contains all of the information about the bricks. And the png is the bricks' texture. 

#### List

This subdirectory just contains the component for the list view.

#### Scrolling

This subdirectory contains all of the content in the scrolling view. The panels.js file handles the panels and zooming, the path.js is  the bricks in particular, and scrollingContent.js is the path and the panels together. The selectedBrick.js file is the pop-up window when a user clicks on one of the bricks. The subfolder "panels" contains all of the images of the panels in lower resolution used in the scrolling path in the "small" subfolder and the higher resolution images used for zooming in the "big" subfolder.

## Bricks layout

Within the json file, each brick has three coordinates: the panel the brick is located in front of, the row it is in, and the column the brick is in. The panels are numbered 1 through 13 starting on the left, though panel numbers outside this range are used for bricks not in front of a panel. The rows are from 1 through 15, with the row closest to the panels being 1. Laslty, columns are from 0 to 9, and are according to where a brick is located in front of a panel. 

## Adding a new brick

Adding a new brick can be done easily in the json file located in **/pages/bricks/db.json**. There are slight discrepancies in location from the true path to the site, so I strongly encourage you to use locations of a reference brick, rather than simply measuring where the brick is in space. If two bricks are mistakenly attributed to the same location, the filtering system no longer works. Each brick must have a naming year, panel number, column number, three inscription lines, a purchaser name, and an assigned section. If a brick does not have three rows inscribed, the second and/or third should be included simply as an empty string. If a brick is not associated with a section, make it an empty string.