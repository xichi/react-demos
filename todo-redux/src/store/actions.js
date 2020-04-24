  /*
    action creator函数，用来创建action对象的函数模块
  */
export const toggleModalShown = (boolean) => { return {type: 'TOGGLE_MODAL_SHOWN', modalShown: boolean}}