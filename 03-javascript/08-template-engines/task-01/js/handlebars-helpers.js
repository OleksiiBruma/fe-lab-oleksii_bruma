Handlebars.registerHelper("formatAddress",function(property){
    return property.slice(14);
});
Handlebars.registerHelper("formatData",function(property){
    let date = new Date(property);
    let currentDate = new Date();
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
});