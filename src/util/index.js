const util = {
  objectFindByKey (object, key, value) {
    for (var i in object) {
      if (object[i][key] === value) {
        return i
      }
    }
    return null
  }
}
export default util
