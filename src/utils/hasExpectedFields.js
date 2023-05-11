export default function hasExpectedFields(object, expectedFields) {
    var hasAllFields = true
  
    expectedFields.forEach(field =>
      hasAllFields = hasAllFields && object.hasOwnProperty(field)
    )
  
    return hasAllFields
  }