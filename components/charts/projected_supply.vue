<template>
  <div>
    <!-- eslint-disable-next-line vue/attribute-hyphenation -->
    <highcharts ref="highcharts" class="chart" :options="chartOptions" :updateArgs="updateArgs" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      updateArgs: [true, true, { duration: 1000 }, false],
    };
  },
  computed: {
    chartOptions() {
      const firstYearIssuance = this.$store.state.issuance.firstYearIssuance;
      const labels = firstYearIssuance.map(v => (v[0]));
      console.log(labels);
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
