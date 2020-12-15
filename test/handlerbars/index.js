const Handlebars = require('handlebars');



const template = Handlebars.compile("Name: {{name}}, my sex is {{sex}}, age is {{age}}");
console.log(template({ name: "Nils", sex: 'man', age: 40 }));



var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";

    
console.log(
    Handlebars.compile(source)({
        "name": "Alan", "hometown": "Somewhere, TX",
        "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
    })

)