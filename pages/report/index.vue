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
        <export-excel
          class="btn btn-outline-success mb-3"
          worksheet="laporan_produksi"
          name="laporan_produksi.xls"
          :data="filterdReportData"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-download"
          ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Export to Excel
        </export-excel>
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
            <tr v-for="item in filterdReportData" :key="item.no">
              <td>{{ item.no }}</td>
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
      let number = 1
      this.reportData.forEach((item) => {
        if (item.tanggal === this.tanggalSelected) {
          this.filterdReportData.push({
            no: number++,
            tanggal: item.tanggal,
            wilayah: item.wilayah,
            produksi: item.produksi
          })
          this.totalProduksi += item.produksi
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
