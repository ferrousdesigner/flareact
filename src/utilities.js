export const toCamelCase = (value) => {
    return value
      .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
  }
  
  export const toTitleCase = (string) => string.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + string.replace(/([A-Z])/g, " $1").slice(1);
  
  export const toKebabCase = (string) => string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]|\b)|[A-Z]?[a-z]+[0-9]|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');