const formatTelephone = (telephone) => {
  if (telephone !== null) {
      let removed = telephone.slice(2)
      let areaCode = removed.slice(0, 3)
      let prefix = removed.slice(3, 6)
      let lineNumber = removed.slice(6, 10)
      return `(${areaCode}) ${prefix}-${lineNumber}`
  } else {
      return ''
  }
}

export default formatTelephone;