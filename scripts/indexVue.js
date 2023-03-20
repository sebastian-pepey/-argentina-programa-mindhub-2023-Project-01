const { createApp } = Vue

createApp(
  {
    data() {
      return {
        urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
        events: null,
        eventsBackup: [],
        categories: [],
        categoryChecked:[],
        inputValue : '',
      }
    },
    created() {
      this.fetchAPIEvents()
    },
    mounted() {
    },
    methods: {
      fetchAPIEvents() {
        fetch(this.urlApi)
        .then( result => result.json())
        .then(data => {
          this.events = data.events;
          this.eventsBackup = data.events;
          this.createFilterCategory(this.events)
        })
      },

      createFilterCategory(inputObject) {
        inputObject.forEach( element => {
          if(!this.categories.includes(element.category)) {
            this.categories.push(element.category);
          }
        })
      },
    },
    computed: {
      filter(){
        let inputFilter = this.eventsBackup.filter( event => this.categories.includes(event.category))
        if(categories.length > 0) {


        } else {
          this.events = inputFilter
        }
      },
    }
  }).mount('#app')