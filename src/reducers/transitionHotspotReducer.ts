type Size = {
  innerRadius: number;
  outerRadius: number;
};

interface State {
  color: string;
  innerCircle: Size;
  outerCricle: Size;
}

type Action =
  | { type: TransitionTypes.changeColor; color: string }
  | { type: TransitionTypes.increaseSize; param: number }
  | { type: TransitionTypes.decreaseSize; param: number };

export enum TransitionTypes {
  changeColor = "CHANGECOLOR",
  increaseSize = "INCREASESIZE",
  decreaseSize = "DECREASESIZE",
}
//6f6
export const transitionHotspotInitialState: State = {
  color: "#6f6",
  innerCircle: {
    innerRadius: 0,
    outerRadius: 1.3,
  },
  outerCricle: {
    innerRadius: 2,
    outerRadius: 3,
  },
};

export default function transitionHotspotReducer(
  state: State = transitionHotspotInitialState,
  action: Action
): State {
  switch (action.type) {
    case TransitionTypes.changeColor:
      return { ...state, color: action.color };

    case TransitionTypes.increaseSize:
      return { ...state, ...changeSize(action.param, true) };

    case TransitionTypes.decreaseSize:
      return { ...state, ...changeSize(action.param, false) };
  }

  function changeSize(
    param: number,
    sum: boolean
  ): { innerCircle: Size; outerCricle: Size } {
    const radius = sum ? param : -param;

    const innerCircle: Size = {
      innerRadius: 0,
      outerRadius: state.innerCircle.outerRadius + radius,
    };
    const outerCricle: Size = {
      innerRadius: state.outerCricle.innerRadius + radius* 1.1,
      outerRadius: state.outerCricle.outerRadius + radius * 1.5,
    };
    return {
      innerCircle,
      outerCricle,
    };
  }
}
