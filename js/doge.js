/**
 * 
 * @param {} canvas the createGraphics object on which the doges are drawn
 */
function Doges({
    canvas
}) {
    P5Object.call(this, { canvas: canvas });

}
Object.setPrototypeOf(Doges.prototype, P5Object.prototype);