<template>
  <layout-main>
    <v-card>
      <v-container fluid>
        <v-layout wrap>
          <v-flex
            md3
            class="pa-3 mb-3 feature-pane"
          >
            <v-btn
              fab
              outline
              small
              absolute
              left
              color="primary"
              @click="$refs.calendar.prev()"
            >
              <v-icon dark>
                keyboard_arrow_left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              outline
              small
              absolute
              right
              color="primary"
              @click="$refs.calendar.next()"
            >
              <v-icon
                dark
              >
                keyboard_arrow_right
              </v-icon>
            </v-btn>
            <br><br><br>
            <v-select
              v-model="type"
              :items="typeOptions"
              label="Type"
            ></v-select>
            <v-select
              v-model="weekdays"
              :items="weekdaysOptions"
              label="Weekdays"
            ></v-select>
          </v-flex>
          <v-flex
            md9
            class="pl-3"
          >
            <v-sheet height="500">
              <v-calendar
                ref="calendar"
                v-model="start"
                :type="type"
                :start="start"
                :end="end"
                :min-weeks="minWeeks"
                :max-days="maxDays"
                :now="now"
                :weekdays="weekdays"
                :first-interval="intervals.first"
                :interval-minutes="intervals.minutes"
                :interval-count="intervals.count"
                :interval-height="intervals.height"
                :show-interval-label="showIntervalLabel"
                :color="color"
              >
              </v-calendar>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </layout-main>
</template>

<script>
import LayoutMain from '../layouts/Main.vue'
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 40
}
export default {
  name: 'PageTimesheet',
  components: {
    LayoutMain: LayoutMain
  },
  data: () => ({
    startMenu: false,
    start: '2019-01-12',
    endMenu: false,
    end: '2019-01-27',
    nowMenu: false,
    minWeeks: 1,
    now: null,
    type: 'month',
    typeOptions: [
      { text: 'День', value: 'day' },
      { text: 'Неделя', value: 'week' },
      { text: 'Мемяц', value: 'month' }
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: 'Воскресенье - Суббота', value: weekdaysDefault },
      { text: 'Пн, Ср, Пт', value: [1, 3, 5] },
      { text: 'Пн - Пт', value: [1, 2, 3, 4, 5] },
      { text: 'Пн - Вс', value: [1, 2, 3, 4, 5, 6, 0] }
    ],
    intervals: intervalsDefault,
    maxDays: 7,
    styleInterval: 'default',
    color: 'primary'
  }),
  methods: {
    showIntervalLabel (interval) {
      return interval.minute === 0
    }
  }
}
</script>

<style lang="scss">
  .feature-pane {
    position: relative;
    padding-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .day-header {
    margin: 0px 2px 2px 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day-body {
    position: absolute;
    top: 400px;
    height: 36px;
    margin: 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day {
    position: relative;
    height: 24px;
    margin: 0px;
    padding: 0px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
