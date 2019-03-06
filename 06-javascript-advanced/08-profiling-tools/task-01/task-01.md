Step 1 : Open performance tab in devtools time;
Step 2 : Press the record button, scroll, and hover over the elements and after some time press stop;
Step 3 : Analyze summary pie-chart so that you can see that something is wrong with scripting - scripting occupied the major time of loading;  
Step 4 : I found out that the for loops inside the callback functions for addEventListeners are redundant in this case, so I removed it;
Step 5 : When you reanalyze summary pie-chart and the rendering tool, you will see that there are improvements in scripting but there is a problem with painting;
Step 6 : I found out that some properties could be moved to the css;