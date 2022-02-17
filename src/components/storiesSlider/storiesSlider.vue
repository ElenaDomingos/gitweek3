<template>
  <div class="slider" >
    <div class="stories-container">
      <ul class="stories-wrapper" ref="slider">
        <li class="single-storie"
        v-for="(trending, ndx) in trendings"
        :key="trending.id"
         ref="item"
        >
      <slide :data="getStoryData(trending)"
      :active="slideNdx === ndx"
      :loading="slideNdx === ndx && loading"
      :btnsShown="activeBtns"
      @onNextSlide="handleSlider(ndx + 1)"
      @onPrevSlide="handleSlider(ndx - 1)"
      @onProgressFinish="handleSlider(ndx + 1)" />
</li>
  </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { slide } from '../slide'
export default {
  name: 'storiesSlider',
  components: {
    slide

  },
  props: {
    initialSlide: {
      type: Number
    }
  },
  data () {
    return {
      slideNdx: 0,
      sliderPosition: 0,
      loading: false,
      btnsShown: true

    }
  },
  computed: {
    ...mapState({
      trendings: (state) => state.trendings.data
    }),

    activeBtns () {
      if (this.btnsShown === false) return []
      if (this.slideNdx === 0) return ['next']
      if (this.slideNdx === this.trendings.lenght - 1) return ['prev']
      return ['next', 'prev']
    }
  },
  methods: {
    ...mapActions({
      fetchTrendings: 'trendings/fetchTrendings',
      fetchReadme: 'trendings/fetchReadme'
    }),
    async fetchReadmeForActiveSlide () {
      const { id, owner, name } = this.trendings[this.slideNdx]
      await this.fetchReadme({ id, owner: owner.login, repo: name })
    },
    getStoryData (obj) {
      return {
        id: obj.id,
        userAvatar: obj.owner?.avatar_url,
        username: obj.owner?.login,
        content: obj.readme
      }
    },
    moveSlider (slideNdx) {
      const { slider, item } = this.$refs
      console.log(typeof slider)
      const slideWidth = parseInt(
        getComputedStyle(item[0]).getPropertyValue('width'), 10)
      this.slideNdx = slideNdx
      this.sliderPosition = -(slideWidth * slideNdx)
      console.log(this.sliderPosition)
      slider.style.transform = `translateX(${this.sliderPosition}px)`
    },
    async loadReadme () {
      this.loading = true
      this.btnsShown = false
      try {
        await this.fetchReadmeForActiveSlide()
      } catch (e) {
        console.log(e)
        throw e
      } finally {
        this.loading = false
        this.btnsShown = true
      }
    },
    async handleSlider (slideNdx) {
      this.moveSlider(slideNdx)
      await this.loadReadme()
    }

  },
  async mounted () {
    if (this.initialSlide) {
      const ndx = this.trendings.findIndex(item => item.id === this.initialSlide)
      console.log(this.initialSlide)
      await this.handleSlider(ndx)
    }
  },
  async created () {
    await this.fetchTrendings()
    await this.loadReadme()
  }

}
</script>

<style lang="scss">
.stories-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  margin-left: -200px;
  transition: .4s;
  overflow: hidden;
  left:50%;

}
.stories-container {
   height:660px;
   position: relative;
   overflow:hidden;
}
</style>
