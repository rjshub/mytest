const http_request = {
  workItemList() {
    this.$http.get('https://easy-mock.com/mock/5d6395ad5abfb4446ff8a998/demo-allsense/workItem').then(res => {
      if (res.status === 200) {
        console.log(res.body, 123)
        return res.body
      }
    }).catch(err => {
      console.log(err, 324)
    })
  }
}

export default http_request
