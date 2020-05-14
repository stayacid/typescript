function strip(x: string | number) {
  if (typeof x === 'number') {
    return x.toFixed(2)
  }
  return x.trim()
}

class MyResponse {
  header = 'response header'
  result = 'response result'
}

class MyError {
  header = 'error header'
  message = 'error result'
}

function handle(response: MyResponse | MyError) {
  if (response instanceof MyResponse) {
    return {
      info: response.header + response.result
    }
  } else {
    return {
      info: response.header + response.message
    }
  }
}

const err = new MyError()
console.log(handle(err));

// ===
type AlertType = 'success' | 'danger' | 'warning'
function setAlertType(type: AlertType) {

}

setAlertType('success')