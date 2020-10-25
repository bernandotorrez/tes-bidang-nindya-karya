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
              :disabled="!tanggalSelected"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <div v-if="isButtonSubmitted" class="text-center mt-4">
        <div class="spinner-border text-success mt-4" style="width: 5rem; height: 5rem;" role="status">
          <span class="sr-only texgt-center">Loading Table...</span>
        </div>
        <p />
        <span class="text-center mt-1 text-warning">Loading Table ...</span>
      </div>

      <div v-if="isShowReportTable" class="table-responsive">
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
            <tr v-for="(item, index) in filterdReportData" :key="item.no">
              <td>{{ index+1 }}</td>
              <td>{{ item.tanggal }}</td>
              <td>{{ item.wilayah }}</td>
              <td>{{ formatNumber(item.produksi) }}</td>
            </tr>

            <tr class="font-weight-bold">
              <td colspan="3" class="text-right">
                Total Produksi :
              </td>
              <td>{{ formatNumber(totalProduksi) }}</td>
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
      isShowReportTable: false,
      filterdReportData: [],
      no: 0,
      totalProduksi: 0,
      isButtonSubmitted: false
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
      this.isButtonSubmitted = true
      this.isShowReportTable = false
      setTimeout(() => {
        this.reportProcess()
      }, 2000)
    },
    reportProcess () {
      this.filterdReportData = []
      this.totalProduksi = 0
      this.reportData.forEach((x) => {
        if (x.tanggal === this.tanggalSelected) {
          this.filterdReportData.push(x)
          this.totalProduksi += x.produksi
        }
      })

      this.isButtonSubmitted = false
      this.isShowReportTable = true
    },
    formatNumber (number) {
      const parts = number.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return parts.join(',')
    }
  }
}
</script>
