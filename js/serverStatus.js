function httpRequest(obj) {
    //兼容性处理
    var xhr = null
    try {
        xhr = new XMLHttpRequest()
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.open('get', obj, false)
    xhr.send(null)

    if (xhr.readyState === 4 && xhr.status === 200) {
        return xhr.response
    } else {
        return undefined
    }

}
function getServerStatus() {
    var url = "https://api.bedrockinfo.com/v2/status?server=121.43.188.225&port=11264"
    var sUrl = url + '#' + (new Date()).getTime()
    var a = httpRequest(sUrl)
    if (a === undefined) {
        return undefined
    } else {
        var temp = JSON.parse(a)
        return {
            GameMode: temp.GameMode,
            LevelName: temp.LevelName,
            MaxPlayers: temp.MaxPlayers,
            Online: temp.Online,
            Players: temp.Players,
            ServerName: temp.ServerName,
            Version: temp.Version
        }
    }
}