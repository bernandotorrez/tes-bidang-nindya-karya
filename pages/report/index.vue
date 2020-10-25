<template>
  <div>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">
          Report
        </h1>
      </div>

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="input-group">
          <select v-model="tanggalSelected" class="custom-select">
            <option v-for="data in reportDate" :key="data">
              {{ data }}
            </option>
          </select>
          <div class="input-group-append" @click="showReport">
            <button
              class="btn btn-outline-success"
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <div v-if="isTanggalSubmitted" class="table-responsive">
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
            <!-- <tr v-for="table in tableData" :key="table.no">
              <td>{{ table.no }}</td>
              <td>{{ table.tanggal }}</td>
              <td>{{ table.wilayah }}</td>
              <td>{{ formatNumber(table.produksi) }}</td>
            </tr> -->
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
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
      reportData: null,
      reportDate: null,
      tanggalSelected: '',
      isTanggalSubmitted: false
    }
  },
  mounted () {
    this.callReportData()
  },
  methods: {
    async callReportData () {
      const response = await this.$axios.get('http://localhost:3000/table.json')
      const { data } = response.data

      this.reportData = data

      const result = []
      data.forEach((x) => {
        if (!result.includes(x.tanggal)) {
          result.push(x.tanggal)
        }
      })

      this.reportDate = result
    },
    showReport () {
      this.isTanggalSubmitted = true
      console.log(this.tanggalSelected)
    }
  }
}
</script>
