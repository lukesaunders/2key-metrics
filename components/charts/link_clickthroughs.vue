<template>
  <!-- eslint-disable-next-line vue/attribute-hyphenation -->
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs" />
</template>

<script>
export default {
  data() {
    return {
      title: '',
      updateArgs: [true, true, { duration: 1000 }],
    };
  },
  computed: {
    chartOptions() {
      const entries = this.$store.state.link_clickthroughs.entries;
      return {
        chart: {
          height: 300,
          type: 'spline',
        },
        title: {
          text: '',
        },
        legend: false,
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
          },
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%Y',
          },
          title: {
            text: 'Date',
          },
        },
        yAxis: [{
          title: {
            text: 'Link clickthroughs (per day)',
          },
        }],
        series: [{
          color: 'rgb(0, 94, 56)',
          name: 'clickthroughs',
          data: entries.map(v => ([new Date(v.date).getTime(), v.value])),
        }],
      };
    },
  },
};
</script>

<style>
</style>
