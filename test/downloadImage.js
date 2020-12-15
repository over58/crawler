function downloadImage () {
    axios.get('https://qnyb17.cdn.ipalfish.com/17/picturebook/63/db/e27db5ad40b03e705790a9ff1168', {
        responseType: 'blob'
    }).then(res => {
        let url  = window.URL.createObjectURL(res.data)
        var a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', 'test')
        a.click()

        window.URL.revokeObjectURL(url)
    })
}

