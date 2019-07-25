class Kalkulator{
  constructor(angka1, angka2) {
    this.angka1 = angka1
    this.angka2 = angka2
    this.Kosongkan()
  }

  Kosongkan() {
    this.angkano1 = ''
    this.angkano2 = ''
    this.operasi = ''
  }

  hapus() {
    this.angkano1 = this.angkano1.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.angkano1.includes('.')) return
    this.angkano1 = this.angkano1.toString() + number.toString()
  }

  pilih(operasi) {
    if (this.angkano1 === '') return
    if (this.angkano2 !== '') {
      this.hitung()
    }
    this.operasi = operasi
    this.angkano2 = this.angkano1
    this.angkano1 = ''
  }

  hitung() {
    let hitung
    const sebelum = parseFloat(this.angkano2)
    const sekarang = parseFloat(this.angkano1)
    if (isNaN(sebelum) || isNaN(sekarang)) return
    switch (this.operasi) {
      case '+':
        hitung = sebelum + sekarang
        break
      case '-':
        hitung = sebelum - sekarang
        break
      case '*':
        hitung = sebelum * sekarang
        break
      case '÷':
        hitung = sebelum / sekarang
        break
      default:
        return
    }
    this.angkano1 = hitung
    this.operasi = undefined
    this.angkano2 = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  perbarui() {
    this.angka2.innerText =
      this.getDisplayNumber(this.angkano1)
    if (this.operasi != null) {
      this.angka1.innerText =
        `${this.getDisplayNumber(this.angkano2)} ${this.operasi}`
    } else {
      this.angka1.innerText = ''
    }
  }
}


const angkaButtons = document.querySelectorAll('[data-angka]')
const operasiButtons = document.querySelectorAll('[data-operasi]')
const samadenganButton = document.querySelector('[data-samadengan]')
const hapusButton = document.querySelector('[data-hapus]')
const kosongkanButton = document.querySelector('[data-kosongkan]')
const angka1 = document.querySelector('[data-dataangka1]')
const angka2 = document.querySelector('[data-dataangka2]')

const kalkulator = new Kalkulator(angka1, angka2)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    kalkulator.appendNumber(button.innerText)
    kalkulator.perbarui()
  })
})

operasiButtons.forEach(button => {
  button.addEventListener('click', () => {
    kalkulator.pilih(button.innerText)
    kalkulator.perbarui()
  })
})

samadenganButton.addEventListener('click', button => {
  kalkulator.hitung()
  kalkulator.perbarui()
})

kosongkanButton.addEventListener('click', button => {
  kalkulator.Kosongkan()
  kalkulator.perbarui()
})

hapusButton.addEventListener('click', button => {
  kalkulator.hapus()
  kalkulator.perbarui()
})
