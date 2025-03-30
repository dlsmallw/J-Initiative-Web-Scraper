/**
* @file scrape-page.test.js
* @fileoverview Runs tests on existing code
*
* @module Renderer
*/


import { ScrapePageController } from '../frontend/components/views/scrape-page.js';


/**
* Collection of all page controller instances used for dynamic navigation.
*
* @constant {Object} Pages
* @memberof module:Renderer
*/
/*const Pages = {
    //Home: new HomePageController(),
    Scrape: new ScrapePageController() //,
    //Annotation: new AnnotationPageController(),
    //Database: new DatabasePageController(),
    //About: new AboutPageController(),
    //Logs: new LogPageController()
};

*/
test('basic test', () => {
    expect((0+1)).toBe(1);
  });