export class ExposureService {
  public static timer = null;
  public static watchObjectMap: any = {};

  // 初始化元素，获取元素自身信息；并存入观测列表
  public static initExposureCondition(element: HTMLElement) {
    const { clientWidth, clientHeight } = element;
    const { top, bottom } = element.getBoundingClientRect();

    const obj = {
      lock: false,
      count: 0,
      id: element.id,
      width: clientWidth,
      height: clientHeight,
      top,
      bottom,
      condition: clientHeight / 2
    };

    if (!ExposureService.watchObjectMap[obj.id]) {
      ExposureService.watchObjectMap[obj.id] = {};
    }

    ExposureService.watchObjectMap[obj.id] = obj;
  }

  // 观测
  public static watch() {
    clearTimeout(ExposureService.timer);
    ExposureService.timer = setTimeout(() => {
      for (let item of Object.keys(ExposureService.watchObjectMap)) {
        let {
          id,
          top,
          height,
          condition,
          count,
          lock
        } = ExposureService.watchObjectMap[item];

        // 触发一次后锁定，以防止当前元素在视口内滚动重复触发
        if (top - window.scrollY < condition && !lock) {
          ExposureService.watchObjectMap[item].lock = true;
          ExposureService.watchObjectMap[item].count =
            ExposureService.watchObjectMap[item].count + 1;
          // 触发watch
        }

        // 解锁元素，当前元素离开视口时.
        if (top + window.scrollY > top + height) {
          ExposureService.watchObjectMap[item].lock = false;
        }
        console.log(ExposureService.watchObjectMap);
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
