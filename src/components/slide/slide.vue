<template>
  <div class="slide" :class="{active}">
    <div class="slide__wrapper">
      <div class="slide__header">
      <Progress :active="active" :startProgress="active" @onFinish="$emit('onProgressFinish')" />
      <div class="user">
        <user :name="data.username" :src="data.userAvatar" />
      </div>
      </div>
      <div class="slide-content">
        <div class="loader" v-if="loading">
          <spinner />
        </div>
        <div class="info" v-else>
          <div
            v-if="data.content?.length"
            v-html="data.content"
          ></div>
          <placeholder v-else :paragraphs="2" />
        </div>
        <div class="slide__footer">
          <x-button>Following</x-button>
        </div>
        <template v-if="active">
          <button v-if="btnsShown.includes('next')" class="btn btn-next" @click="$emit('onNextSlide')">
            <span class="arrow">
              <icon name="arrow"/>
            </span>
          </button>
          <button v-if="btnsShown.includes('prev')" class="btn btn-prev" @click="$emit('onPrevSlide')">
            <span class="arrow">
              <icon name="arrow" />
            </span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import { button } from '../../components/button'
import { progress as Progress } from '../../components/progress'
import { user } from '../../components/user'
import { spinner } from '../../components/spinner'
import { icon as Icon } from '../../icons'
import { placeholder } from '../../components/placeholder'

export default {
  components: {
    user,
    xButton: button,
    Progress,
    spinner,
    Icon,
    placeholder

  },
  emits: ['onPrevSlide', 'onNextSlide', 'onProgressFinish'],
  props: {
    active: Boolean,
    loading: Boolean,
    startProgress: Boolean,
    btnsShown: {
      type: Array,
      default: () => ['next', 'prev'],
      validator (value) {
        return value.every(item => item === 'next' || item === 'prev')
      }
    },
    data: {
      type: Object,
      required: true
    }
  }

}
</script>

<style src="./slide.scss" lang="scss"></style>
