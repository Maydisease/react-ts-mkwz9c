export class ExposureService {
  public static objectMap: any = {};

  public static timer = null;

  public static getExposureConditions(element: HTMLElement) {
    let obj = {
      lock: false,
      id: '',
      count: 0,
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      condition: 0
    };
    const { clientWidth, clientHeight } = element;
    const { top, bottom } = element.getBoundingClientRect();

    obj = {
      lock: false,
      count: 0,
      id: element.id,
      width: clientWidth,
      height: clientHeight,
      top,
      bottom,
      condition: clientHeight / 2
    };

    if (!ExposureService.objectMap[obj.id]) {
      ExposureService.objectMap[obj.id] = {};
    }

    ExposureService.objectMap[obj.id] = obj;
  }

  public static watch() {
    clearTimeout(ExposureService.timer);
    ExposureService.timer = setTimeout(() => {
      for (let item of Object.keys(ExposureService.objectMap)) {
        let {
          id,
          top,
          height,
          condition,
          count,
          lock
        } = ExposureService.objectMap[item];
        if (top - window.scrollY < condition && !lock) {
          ExposureService.objectMap[item].lock = true;
          // console.log(`${id} 可见`, count);
          count = count + 1;
        }
        console.log(id, top - window.scrollY, top + height);
      }
    }, 100);
  }

  public static init() {
    document.addEventListener('scroll', res => {
      ExposureService.watch();
    });
  }
}

ExposureService.init();
