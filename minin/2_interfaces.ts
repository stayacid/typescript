interface Rect {
  readonly id: string
  color?: string // not necessary
  size: {
    width: number
    height: number
  }
}

const rect1: Rect = {
  id: 'id1',
  size: {
    width: 20,
    height: 30
  },
  color: '#ccc'
}

const rect2: Rect = {
  id: 'id2',
  size: {
    width: 10,
    height: 10
  },
}
rect2.color = 'black'

const rect3 = {} as Rect
const rect4 = <Rect>{}

// extend interface
interface RectWithArea extends Rect {
  getArea: () => number
}

const rect5: RectWithArea = {
  id: 'id5',
  size: {
    width: 20,
    height: 20
  },
  getArea(): number {
    return this.size.width * this.size.height
  }
}

// use interface with class
interface IClock {
  time: Date
  setTime(date: Date): void
}

class Clock implements IClock {
  time: Date = new Date()
  setTime(date: Date): void {
    this.time = date
  }
}

// =======
interface Styles {
  [key: string]: string
}

const css: Styles = {
  border: '1px solid black',
  marginTop: '2px',
  borderRadius: '5px'
}