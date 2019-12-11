const formatTelephone = (person) => {

  if(person == null)
      return null;

  if(person.telephones == null)
      return null;

  if(person.telephones.length == 0)
      return null;

  let telephoneObject = person.telephones[0];



  if (telephoneObject !== null) {
      let telephoneNumber = telephoneObject.telephone;

      if(telephoneNumber.length == 10) {
          let removed = telephoneNumber.slice(2)
          let areaCode = removed.slice(0, 3)
          let prefix = removed.slice(3, 6)
          let lineNumber = removed.slice(6, 10)
          return `(${areaCode}) ${prefix}-${lineNumber}`
      } else {
          return telephoneNumber;
      }
  } else {
      return null
  }
}

export default formatTelephone;