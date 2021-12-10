
export interface TransitionPoint{
    x: number,
    y: number,
    z: number
}

export interface View{
    name: string,
    image: string,
    hotspots: {
        name: string,
        transiitonPoint: TransitionPoint
    }[],

}