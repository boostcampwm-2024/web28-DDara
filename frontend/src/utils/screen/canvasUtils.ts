// 캔버스랑 지도 연동 관련된 유틸

// lat: 위도(y), lng: 경도(x)
export interface ICanvasVertex {
  ne: {
    x: number;
    y: number;
  };
  nw: {
    x: number;
    y: number;
  };
  se: {
    x: number;
    y: number;
  };
  sw: {
    x: number;
    y: number;
  };
}

export const getCanvasVertexPosition = (canvasHTMLObject: HTMLCanvasElement): ICanvasVertex => {
  const width = canvasHTMLObject.offsetWidth;
  const height = canvasHTMLObject.offsetHeight;

  return {
    ne: {
      x: 0,
      y: 0,
    },
    nw: {
      x: width,
      y: 0,
    },
    se: {
      x: 0,
      y: height,
    },
    sw: {
      x: width,
      y: height,
    },
  };
};
