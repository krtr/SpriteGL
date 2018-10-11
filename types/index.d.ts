import Shader from "./Shader";
import SpriteRenderer from "./SpriteRenderer";
import TextDrawer from "./TextDrawer";
import VBO from "./VBO";
declare const SpriteGL: {
    Shader: typeof Shader;
    SpriteRenderer: typeof SpriteRenderer;
    TextDrawer: typeof TextDrawer;
    VBO: typeof VBO;
};
export { Shader, SpriteGL, SpriteRenderer, TextDrawer, VBO };
export default SpriteGL;
