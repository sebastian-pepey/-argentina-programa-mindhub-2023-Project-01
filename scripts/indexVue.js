const { createApp } = Vue

createApp(
  {
    data() {
      return {
        events: null,
        eventsFiltered: null,
        categories: [],
        categoryChecked:[]
      }
    },
    created() {
      this.fetchAPIEvents()
    },
    mounted() {
    },
    methods: {
      fetchAPIEvents() {
        let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';
        fetch(urlApi)
        .then( result => result.json())
        .then(data => {this.events = data.events;
          this.filterCategory(this.events)
        })
      },

      filterCategory(inputObject) {
        inputObject.forEach( element => {
          if(!this.categories.includes(element.category)) {
            this.categories.push(element.category);
          }
        })
      },

      applyFilter(){

        // if()

        // this.categoryChecked.forEach( category => {
          
        //   this.events.forEach( event => {

        //     if(event.category === category){
    
        //       this.eventsFiltered.push(event)
    
        //     }
        //   })

        // })
      }
    },
  }).mount('#app')