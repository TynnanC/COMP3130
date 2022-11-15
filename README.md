# Testing #
This mobile application has been built to run specifically on Android platforms.

In order to test the application, please use an android simulator. The application was built and tested on a Pixel 4, using the 'Q' system image. The Pixel 4 is 5.7" diagonally, and 1080 by 2280 pixels. Please run the system in portrait mode.

It is suggested to run this through Android studio. Please run npm install on the applications root directory before testing to ensure all necessary modules are downloaded.

Some images have been included in the assets folder, downloaded from RoboHash.org, in order to aid testing and demonstrate the application as best it can in it's current manner. I would suggest using these for testing the creation of new collections, images, and registration as the are square shapped images, and thus work best in the applications current state.

To log in to a to test user account use the following details:

username: user1, password: pass1

# Issues to consider for future development. #
In order to expand upon this application, time should be spent addressing some issues with it.

Firstly, some error messages for not entering title, descriptions etc into text inputs will not disappear after changing the screen. These should clear after a screen change, though I was unable to establish how to work with the fieldTouched functionalities to make it work. Fixing this will improve the continuity of the application, allowing incomplete inputs to be removed entirely after changing screens.

Secondly, this application does contain numerous elements using static sizes for images and fonts, thus large images do not display very well. This issue was found as height and width properties are required for images, but I was unsure how to accommadate all image sizes. Smaller images, or those that have very similar width and heights, will display fine.

Finally, this application has not been tested on landscape devices, or devices on other platforms. These variables would likely cause problems with the current codebase due to static sizes, components that only work on specific platforms, and considerations not being made for different device sizes and builds. This must be taken into consideration for future development as the potential customer base is greatly reduced without this level of flexibility.

# Fixes for deliverable two. #
The collections screen now updates to reflect a new memory being added to specific collection. This only impacts when a specific collection was being
viewed, the New Memory tab was used, and the My Collections tab is used again after making a new memory.

New memory Ids now use Math.max to determine the max Id. This addresses issues where a new memory is added then deleted, causing a duplicate Id for future new memories.

Refreshing the memories of a collection only returns the memories of that specific collection, not all memories.