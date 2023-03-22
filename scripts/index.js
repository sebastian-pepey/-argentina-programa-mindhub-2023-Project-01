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
      clearFilterCat() {
        this.categoryChecked = []
      }
    },
    computed: {
      filter(){
        let searchFilter = this.eventsBackup.filter( event => event.name.toLowerCase().includes(this.inputValue.toLowerCase()))
        if(this.categoryChecked.length > 0) {
          this.events = searchFilter.filter( event => this.categoryChecked.includes(event.category));
        } else {
          this.events = searchFilter
        }
      },
    },
  }).mount('#app')