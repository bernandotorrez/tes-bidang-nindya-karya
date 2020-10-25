<template>
  <div>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
          Dashboard
        </h1>
      </div>

      <div v-if="!isChartLoaded" class="text-center mt-4">
        <div class="spinner-border text-success mt-4" style="width: 5rem; height: 5rem;" role="status">
          <span class="sr-only texgt-center">Loading Chart...</span>
        </div>
        <p />
        <span class="text-center mt-1 text-warning">Loading Chart ...</span>
      </div>

      <bar-chart v-if="isChartLoaded" :data="barChartData" :options="barChartOptions" :height="200" :width="400" />

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
          Table
        </h1>
      </div>
      <div v-if="!isTableLoaded" class="text-center mt-4">
        <div class="spinner-border text-success mt-4" style="width: 5rem; height: 5rem;" role="status">
          <span class="sr-only texgt-center">Loading Table...</span>
        </div>
        <p />
        <span class="text-center mt-1 text-warning">Loading Table ...</span>
      </div>
      <div v-if="isTableLoaded" class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Wilayah</th>
              <th>Produksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="table in tableData" :key="table.no">
              <td>{{ table.no }}</td>
              <td>{{ table.tanggal }}</td>
              <td>{{ table.wilayah }}</td>
              <td>{{ formatNumber(table.produksi) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  data () {
    return {
      barChartData: null,
      barChartOptions: null,
      isChartLoaded: false,
      isTableLoaded: false,
      tableData: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.callChartData()
      this.callTableData()
    }, 2000)
  },
  methods: {
    async callChartData () {
      const response = await this.$axios.get('http://localhost:3000/chart.json')
      const { barChartData, barChartOptions } = response.data

      this.barChartData = barChartData
      this.barChartOptions = barChartOptions
      this.isChartLoaded = true
    },
    async callTableData () {
      const response = await this.$axios.get('http://localhost:3000/table.json')
      const { data } = response.data

      this.tableData = data
      this.isTableLoaded = true
    },
    formatNumber (number) {
      const parts = number.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return parts.join(',')
    }

  }
}
</script>
