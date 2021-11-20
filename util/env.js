exports.transformEnvironmentVariables = (env) =>
  env.reduce((prev, current) => {
    if (prev !== '') {
      return `${prev}\n${current.key}=${current.value}`
    }
    return `${current.key}=${current.value}`
  }, '')
