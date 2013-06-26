var counter = 0;

var Sentence = Backbone.Model.extend({
  defaults: {
    text: "",
    type: ""
  },

  validate: function(attributes){
    if (!attributes.text) {
      return 'Every sentence must have text.';
    }
    if (!attributes.type) {
      return 'Every sentence must have a WORD type.';
    }
  }
});

var Madlibs = Backbone.Collection.extend({
  model: Sentence
});

var sentence1 = new Sentence({ text: "I I enjoy long, WORD walks on the beach,", type: "Adjective" });
var sentence2 = new Sentence({ text: "getting WORD in the rain ", type: "Verb (past tense - ends with 'ed')" });
var sentence3 = new Sentence({ text: "and serendipitous encounters with WORD.", type: "Noun (plural)" });
var sentence4 = new Sentence({ text: "I really like piña coladas mixed with WORD,", type: "Liquid" });
var sentence5 = new Sentence({ text: "and romantic, candle-lit WORD.", type: "Noun (plural)" });
var sentence6 = new Sentence({ text: "I am well-read from Dr. Seuss to WORD. ", type: "Famous Person" });
var sentence7 = new Sentence({ text: "I travel frequently, especially to WORD, when I am not busy with work.", type: "Place" });
var sentence8 = new Sentence({ text: "I am looking for WORD", type: "Noun (plural)" });
var sentence9 = new Sentence({ text: "and beauty in the form of a WORD goddess. ", type: "Nationality" });
var sentence10 = new Sentence({ text: "She should have the physique of WORD,", type: "Female Celebrity" });
var sentence11 = new Sentence({ text: "and the WORD", type: "Noun" });
var sentence12 = new Sentence({ text: "of WORD.", type: "Person in the room" });
var sentence13 = new Sentence({ text: "I would prefer if she knew how to cook, clean, and wash my WORD.", type: "Noun (Singular or plural)" });
var sentence14 = new Sentence({ text: "I know I’m not very attractive in my picture, but it was taken WORD days ago,", type: "Number" });
var sentence15 = new Sentence({ text: "and I have since become more WORD.", type: "Adjective" });


var myMadlibs = new Madlibs([sentence1, sentence2, sentence3, sentence4, sentence5, sentence6, sentence7, sentence8, sentence9, sentence10, sentence11, sentence12, sentence13, sentence14, sentence15]);

var MadlibView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(){
    this.my_template = _.template($('#madlibsTemplate').html());
    this.render();
    this.$el.css('color','white');
    this.model.on('change', this.render, this);
  },

  events: {
    'click .add' : 'addWord'
  },

  addWord: function(){
    var newWord = prompt("Please enter a word", this.model.get('type'));
    if (!newWord)return;
    this.model.set('text', this.model.attributes.text.replace('WORD', newWord));
    counter += 1;
    $('this button').hide();
  },

  render: function(){
    this.$el.html(this.my_template(this.model.toJSON()));
    return this;
  }
});

var AllmadlibsView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function(){
      console.log(this.collection);
    },

    render: function() {
      this.collection.each(function(sentence){
        $('#container2').append('');
        var madlibView = new MadlibView({ model: sentence });
        this.$el.append(madlibView.render().el);
      }, this);
      return this;
    }
});

$(document).ready(function(){
  madlibsView = new AllmadlibsView({collection: myMadlibs});
  madlibsView.render();
  $('#container').append(madlibsView.el);
  $('#reveal').click(function(){
    if(counter > 15){
      $('li').css('color', 'black');
    }
  });
});

