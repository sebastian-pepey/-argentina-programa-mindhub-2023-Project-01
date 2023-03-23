const { createApp } = Vue

createApp(
  {
    data() {
      return {
        urlApi : 'https://mindhub-xj03.onrender.com/api/amazing',
        events : null,
        eventsBackup : [],
        upcomingEvents: null,
        pastEvents: null,
        categories : [],
        categoryChecked : [],
        inputValue : '',
        numberPastEvents : 5,
        arrayCat: [],
        statistics : {
          upcomingEvents: [],
          pastEvents: [],
          assistance : [],
          capacity : []
        },
        statReduced : {
          assistance : [],
          capacity : []
        }
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
            this.upcomingEvents = data.events.filter( element => new Date(element.date) > new Date(data.currentDate));
            this.pastEvents = data.events.filter( element => new Date(element.date) < new Date(data.currentDate));

            switch(window.location.pathname) {
            case '/upcoming-events.html':
                this.events = this.upcomingEvents;
                this.eventsBackup = this.upcomingEvents;
                break;
            case '/past-events.html':              
                this.events = this.pastEvents;
                this.eventsBackup = this.pastEvents;
                break;
            default:
                this.events = data.events;
                this.eventsBackup = data.events;
            }
            this.createFilterCategory(this.events);
            this.organizeArray(this.events);
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
      },

      organizeArray(arrayOfObjects){     
        let statistics = {
          upcomingEvents: {},
          pastEvents: {}
        }

        arrayOfObjects.forEach(element => {
          if (element.assistance) {

            this.statistics.assistance.push([element.name,element.assistance / element.capacity])
            this.statistics.capacity.push([element.name, element.capacity])

            if(!(element.category in statistics.pastEvents)){
              statistics.pastEvents[element.category] = [element.category,0,0,0] 
            }
            statistics.pastEvents[element.category][1] += element.price * element.assistance;
            statistics.pastEvents[element.category][2] += element.assistance;
            statistics.pastEvents[element.category][3] += element.capacity;
            statistics.pastEvents[element.category][4] = statistics.pastEvents[element.category][2]/statistics.pastEvents[element.category][3];

          } else {
            if(!(element.category in statistics.upcomingEvents)){
              statistics.upcomingEvents[element.category] = [element.category,0,0,0] 
            }
            statistics.upcomingEvents[element.category][1] += element.price * element.estimate;
            statistics.upcomingEvents[element.category][2] += element.estimate;
            statistics.upcomingEvents[element.category][3] += element.capacity;
            statistics.upcomingEvents[element.category][4] = statistics.upcomingEvents[element.category][2]/statistics.upcomingEvents[element.category][3];
          }
        })

        this.orderElements(this.statistics.assistance, 1, true, 1)
        this.orderElements(this.statistics.capacity, 1, true, 1)
        this.statistics.upcomingEvents = Object.values(statistics.upcomingEvents);
        this.statistics.pastEvents = Object.values(statistics.pastEvents);
      },
      
      orderElements(arrayToOrder, index, numeric, invert) {
        if (numeric) {
            arrayToOrder.sort((a, b) => invert*(b[index] - a[index]));
        } else {
            arrayToOrder.sort();
        }
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