<template>
  <div>
    <!-- eslint-disable-next-line vue/attribute-hyphenation -->
    <highcharts ref="highcharts" class="chart" :options="chartOptions" :updateArgs="updateArgs" />
  </div>
</template>

<script>
import { differenceInDays, format } from 'date-fns';

export default {
  data() {
    return {
      title: '',
      updateArgs: [true, true, { duration: 1000 }, false],
    };
  },
  computed: {
    chartOptions() {
      const startDate = new Date('2020-05-12');
      const nowDate = new Date();
      const delta = differenceInDays(nowDate, startDate);
      const plotLineValue = (delta / 365) * 12;
      const firstYearIssuance = this.$store.state.issuance.firstYearIssuance;
      const labels = firstYearIssuance.map(v => (v[0]));
      return {
        chart: {
          height: 200,
          type: 'area',
        },
        legend: false,
        title: {
          text: '',
        },
        xAxis: {
          title: {
            text: '',
          },
          labels: {
            formatter() {
              return labels[this.pos];
            },
          },
          plotLines: [{
            color: 'rgb(85, 85, 85)',
            width: 1,
            value: plotLineValue,
            dashStyle: 'dash',
            label: {
              text: format(nowDate, 'do MMM yyyy'),
              style: {
                color: 'rgb(85, 85, 85)',
                fontSize: '80%',
              },
            },
            zIndex: 6,
          }],
        },
        yAxis: {
          title: {
            text: 'Circulating supply',
          },
        },
        // figure out how to display dates as the x axis
        // and how to present the data by date
        series: [{
          color: 'rgb(0, 94, 56)',
          name: 'supply',
          data: firstYearIssuance.map(v => (v[1])),
        }],
      };
    },
  },
};
</script>

<style>
</style>
