**Header**

Header is in no sticky mode. To see header in sticky mode delete all `--no-sticky` modifiers;

To see the sections about: 
- _no any tasks_, _first entrance_, _add first task_, _excellent message_, _drag first task_ remove class `hidden` where it needed;

**Remove Mode**

To change view to remove mode : 

- add `trash__count--remove-mode` modifier;

- add `task--delete` modifier to all `task` elements;

- add `task--delete-checked` modifier to the 'task' that has been checked;

- add `tab--remove-mode` modifier to `<ul class="global__remove tab tab--remove">...</ul>` and `daily__nav--remove-mode` modifier to `daily__nav`  to see _select all / deselect all_ tabs;

- add `tab--remove-mode` modifier to `<ul class="global__remove tab tab--remove">...</ul>` (that works when the _global list_ is open);
                                              
**Global List** 

- to open global list add `open-button__icon--active`, `global__filter--active`, `global__tasks--active` modifiers;
- to change category of global sublist add modifier with category name to `tasks` (e.g `tasks--work`);

**Task modifiers**

- to change category or priority simply add modifier with category/priority name to `task` (e.g. `task--work`, `task--high`);
- to mark _task_ as _done_ add `task--done` modifier;
- for remove mode add `task--delete` modifier to all `task` elements also add `task--delete-checked` modifier to the 'task' that has been checked;
- to mark _task_ as _overdue_ add `task--overdue` modifier;

**IF YOU USE IE11**

Step 1: go to Tools > Internet Options > Security > Local Intranet > Sites.
Step 2: Uncheck all checkboxes (or only a particular one, if you know how exactly your domain did end up in intranet ones).

NOTE: IE uses (among other things) its proxy settings to determine local sites: if your domain is listed as excluded from proxying in proxy settings, then it will probably be treated as intranet one.
 







