const app = Vue.createApp({
  data() {
    return {
      fact: '',
      cityName: 'London',
      Temperature: '',
      Wind: '',
      Description: '',
      word: 'Bottle',
      Word: ' ',
      Phonetic: '',
      PartOfSpeech: '',
      Definition: ''
    };
  },

  methods: {
    fetchNewFact() {
      fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())
        .then(data => {
          this.fact = data.text;
        });
    },
    retrieveWeather() {
      fetch(`https://goweather.herokuapp.com/weather/${this.cityName}`)
        .then(response => response.json())
        .then(data => {
          this.Temperature = data.temperature;
          this.Wind = data.wind;
          this.Description = data.description;
        });
    },
    fetchWordDefinition() {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
        .then(response => response.json())
        .then(data => {
            const entry = data[0];
            this.Word = entry.word;
            this.Phonetic = entry.phonetic;
            this.PartOfSpeech = entry.meanings[0].partOfSpeech;
            this.Definition = entry.meanings[0].definitions[0].definition;
        });
    }
  },
  created() {
    this.fetchNewFact();
    this.retrieveWeather();
    this.fetchWordDefinition();
  }
})

app.mount('#app');