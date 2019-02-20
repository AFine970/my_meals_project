const state = {
  token: window.sessionStorage.getItem('token'),
  username: window.sessionStorage.getItem('username'),
  radio: window.sessionStorage.getItem('radio'),
  companyId: window.sessionStorage.getItem('companyId'),
  companyName: window.sessionStorage.getItem('companyName')
}

export default state
