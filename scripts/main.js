
Vue.component('my-articles', {
  template: '#my-articles',
  props: ['articles', 'drawCanvas'],
  data: function () {
    return {
      heights: [],
      widths: [],
    };
  },
  watch: {
    drawCanvas(val) {
      if (val) {
        this.calcXY();
        this.drawBox();
        this.$emit('done');
      }
    }
  },
  created: function() {
    let vm = this;
    window.addEventListener('resize', function() {
      vm.calcXY();
      vm.drawBox()
    }, true);
  },
  methods: {
    calcXY: function() {
      let boxes = document.querySelectorAll('.grid-item');
      this.heights = [];
      this.widths = [];
      boxes.forEach(box => {
        this.heights.push(box.clientHeight);
        this.widths.push(box.clientWidth);
      });
    },
    drawBox: function() {
      let multi_canvas = document.querySelectorAll('.grid-item canvas');
      multi_canvas.forEach((canvas, index) => {
        const rc = rough.canvas(canvas);
        const offset = 16;
        rc.rectangle(8, 8, this.getWidth(index) - 8, this.getHeight(index) - 8, {
          strokeWidth: 2
        }); // x, y, width, height, options
        TweenMax.set(canvas, { opacity: 0});
      });
      TweenMax.staggerTo(multi_canvas, .4, { opacity: 1}, 0.1);
    },
    getHeight: function (index) {
      return this.heights[index] + 8;
    },
    getWidth: function (index) {
      return this.widths[index] + 8;
    }
  },
  computed: {
    // getWidth() {
    //   return document.querySelector('#app').getClientRects()[0].width / 4;
    // },
  },
  mounted() {
    // stmt
  }
});

new Vue({
  el: '#app',
  data: {
    articles: [],
    isLoading: false,
    drawCanvas: false,
  },
  methods: {
    getData: function () {
      this.isLoading = true;
      let vm = this;
      fetch('HotBeauties.json')
        .then(res => res.json())
        .then(data => {
          this.articles = data;
          this.isLoading = false;
          this.$nextTick(() => {
            this.enableMasonry();
          });
        });
    },
    enableMasonry: function() {
      var elem = document.querySelector('.grid');
      var msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item',
        percentPosition: true
      });
      var vm = this;
      imagesLoaded(elem, function() {
        msnry.layout();
        msnry.on('layoutComplete', function (items) {
          vm.drawCanvas = true;
        });
      });
    },
  },
  created: function () {
    this.getData();
  }
});





